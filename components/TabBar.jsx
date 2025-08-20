import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import TabBarButton from './TabBarButton';   
import {BlurView} from 'expo-blur'

const TabBar = ({ state, descriptors, navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      style={[
        styles.tabbar,
        { display: keyboardVisible ? 'none' : 'flex' },
      ]}
    >
      {
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          // Exclude specific routes
          if (['_sitemap', '+not-found'].includes(route.name)) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={route.name}
              style={styles.tabbarItem}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              color={isFocused ? "#8a30cf" : "#0b0b0b"}
              label={label}
            />
          );
        })
      }
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    bottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 100,
    borderCurve: 'continuous',
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 3,
    position:'absolute',
  }
});
