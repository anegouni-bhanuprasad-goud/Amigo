import React, { useEffect, useState } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import { Tabs } from 'expo-router';
import TabBar from '../components/TabBar';


const _layout = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);


  useEffect(() => {
    // Handle keyboard visibility
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



  // Render the tabs after the splash screen
  return (
    <Tabs tabBar={(props) => !keyboardVisible && <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          headerShown:false
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          headerBackButtonDisplayMode: 'generic',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerBackButtonDisplayMode: 'generic',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          headerShown: false,
          headerShadowVisible: false,
        }}
      />

      <Tabs.Screen
        name="API_Key"
        options={{
          title: 'API Key',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />

      <Tabs.Screen
        name="VoiceList"
        options={{
          title: 'Voice List',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />

      <Tabs.Screen
        name="Personal_data"
        options={{
          title: 'Personal Details',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />

    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({});
