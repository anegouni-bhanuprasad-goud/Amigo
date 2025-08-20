import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  UIManager,
  LayoutAnimation,
  Platform,
} from "react-native";
import React, { useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

import PersonalData from "../app/Personal_data";
import Api_key from "../app/API_Key";
import VoiceList from "../app/VoiceList";

const TAB_BAR_HEIGHT = 60;

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Define sections for better reusability
const sections = [
  { id: 1, title: "Personal Details", icon: "person", colors: ['#7928CA', '#FF0080'], component: <PersonalData /> },
  { id: 2, title: "API Key", icon: "vpn-key", colors: ['#7928CA', '#FF0080'], component: <Api_key /> },
  { id: 3, title: "Voice Settings", icon: "record-voice-over", colors: ['#7928CA', '#FF0080'], component: <VoiceList /> },
];

const Settings = () => {
  const [pageOpened, setPageOpened] = useState(null);

  const togglePage = useCallback((id) => {
    LayoutAnimation.easeInEaseOut();
    setPageOpened((prev) => (prev === id ? null : id));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Section
            id={item.id}
            title={item.title}
            icon={item.icon}
            colors={item.colors}
            isOpen={pageOpened === item.id}
            onPress={() => togglePage(item.id)}
          >
            {item.component}
          </Section>
        )}
      />
    </View>
  );
};

const Section = ({ id, title, icon, colors, isOpen, onPress, children }) => (
  <View style={[styles.section, isOpen && styles.sectionOpened]}>
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={isOpen ? ["#FFFFFF", "#FFFFFF"] : colors}
        style={[styles.header, isOpen && styles.headerOpened]}
      >
        <Icon name={icon} size={36} color={isOpen ? "#333" : "#FFF"} />
        <Text style={[styles.title, isOpen && { color: "#333" }]}>{title}</Text>
        <Ionicons name={isOpen ? "chevron-up-circle" : "chevron-down-circle"} size={28} color={isOpen ? "#333" : "#FFF"} />
      </LinearGradient>
    </TouchableOpacity>
    {isOpen && <View style={styles.content}>{children}</View>}
  </View>
);

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // White background
    paddingVertical: 10,
  },
  listContent: {
    paddingBottom: TAB_BAR_HEIGHT,
    paddingHorizontal: 16,
  },
  section: {
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#FFF",

  },
  sectionOpened: {
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 12,
  },
  headerOpened: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginLeft: 10,
    color: "#FFF",
  },
  content: {
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
