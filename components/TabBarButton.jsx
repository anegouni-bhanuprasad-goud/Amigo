import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { icons } from '../assets/icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = ({ isFocused, label, routeName, color, ...props }) => {
  const scale = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused, scale]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.3]);
    const top = interpolate(scale.value, [0, 1], [0, 8]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  // Log the routeName for debugging
  console.log('Route Name:', routeName);

  const IconComponent = icons[routeName];
  if (!IconComponent) {
    return null; // or return a default icon
  }

  return (
    <Pressable {...props} style={styles.container}>
      <Animated.View style={animatedIconStyle}>
        <IconComponent color={color} />
      </Animated.View>

      <Animated.Text style={[{ color, fontSize: 11, fontWeight:'600' }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 2,
  },
});

export default TabBarButton;