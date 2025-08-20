import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import * as Speech from 'expo-speech';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';

const VoiceList = () => {
  const voices = [
    { id: 1, name: 'Male - 1', identifier: 'en-in-x-ene-network' },
    { id: 2, name: 'Male - 2', identifier: 'en-au-x-aub-network' },
    { id: 3, name: 'Male - 3', identifier: 'en-in-x-end-local' },
    { id: 4, name: 'Male - 4', identifier: 'en-us-x-iol-network' },
    { id: 5, name: 'Male - 5', identifier: 'en-us-x-iom-network' },
    { id: 6, name: 'Male - 6', identifier: 'en-us-x-tpd-local' },
    { id: 7, name: 'Female - 1', identifier: 'en-AU-language' },
    { id: 8, name: 'Female - 2', identifier: 'en-us-x-tpf-local' },
    { id: 9, name: 'Female - 3', identifier: 'en-us-x-sfg-network' },
    { id: 10, name: 'Female - 4', identifier: 'en-us-x-iob-local' },
    { id: 11, name: 'Female - 5', identifier: 'en-in-x-enc-network' },
    { id: 12, name: 'Female - 6', identifier: 'en-us-x-tpc-network' },
    { id: 13, name: 'Female - 7', identifier: 'en-in-x-ena-network' },
  ];

  const [voiceName, setVoiceName] = useState('');
  const [voiceIdentifier, setVoiceIdentifier] = useState('');
  const [selectedVoiceId, setSelectedVoiceId] = useState(null); // Track selected voice
  const [pitch, setPitch] = useState('1.0');
  const [rate, setRate] = useState('1.0');
  const [volume, setVolume] = useState('1.0');

  useEffect(() => {
    getSpeechData();
  }, []);

  const speakText = (identifier) => {
    Speech.speak("Hello, I am Amigo, your AI assistant. How can I help you?", {
      voice: identifier,
    });
  };

  const speechTest = () => {
    Speech.speak("Hello, I am Amigo, your AI assistant. How can I help you?", {
      voice: voiceIdentifier,
      pitch: Number(pitch),
      rate: Number(rate),
      volume: Number(volume),
    });
  };

  const saveSpeechData = async () => {
    try {
      await SecureStore.setItemAsync('VoiceName', voiceName);
      await SecureStore.setItemAsync('VoiceIdentifier', voiceIdentifier);
      await SecureStore.setItemAsync('Pitch', pitch);
      await SecureStore.setItemAsync('Rate', rate);
      await SecureStore.setItemAsync('Volume', volume);
      Alert.alert('Success', 'Speech settings saved successfully!');
    } catch (error) {
      console.error('Error saving speech data:', error);
    }
  };

  const getSpeechData = async () => {
    try {
      const vName = await SecureStore.getItemAsync('VoiceName');
      const vIdentifier = await SecureStore.getItemAsync('VoiceIdentifier');
      const vPitch = await SecureStore.getItemAsync('Pitch');
      const vRate = await SecureStore.getItemAsync('Rate');
      const vVolume = await SecureStore.getItemAsync('Volume');

      if (vName) setVoiceName(vName);
      if (vIdentifier) setVoiceIdentifier(vIdentifier);
      if (vPitch) setPitch(vPitch);
      if (vRate) setRate(vRate);
      if (vVolume) setVolume(vVolume);
    } catch (error) {
      console.error('Error fetching speech data:', error);
    }
  };

  const renderVoiceItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.voiceItem,
        selectedVoiceId === item.id && styles.selectedVoiceItem, // Highlight selected voice
      ]}
      onPress={() => {
        setSelectedVoiceId(item.id); // Update selected voice
        setVoiceName(item.name);
        setVoiceIdentifier(item.identifier);
        speakText(item.identifier);
      }}
    >
      <Text style={styles.voiceText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.label}>Voice Model</Text>
        <FlatList
          data={voices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderVoiceItem}
          style={styles.voiceList}
          keyboardShouldPersistTaps="handled" // ✅ Prevent tap issues
          nestedScrollEnabled={true} // ✅ Fix FlatList inside ScrollView issue
        />

        {['Pitch', 'Rate', 'Volume'].map((field, index) => (
          <View key={index} style={styles.inputRow}>
            <Text style={styles.label}>{field}:</Text>
            <TextInput
              value={String(Number(field === 'Pitch' ? pitch : field === 'Rate' ? rate : volume) * 100)}
              onChangeText={(text) =>
                field === 'Pitch'
                  ? setPitch(String(Number(text) / 100))
                  : field === 'Rate'
                    ? setRate(String(Number(text) / 100))
                    : setVolume(String(Number(text) / 100))
              }
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={speechTest} style={styles.testButton}>
              <Text style={styles.testButtonText}>Test</Text>
            </TouchableOpacity>
          </View>
        ))}


        <LinearGradient
          colors={['#7928CA', '#FF0080']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientContainer}
        >
          <TouchableOpacity
            TouchableOpacity onPress={saveSpeechData}
            style={styles.touchable}
          >
            <Text style={styles.text}>Save Details</Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: 600
  },
  voiceList: {
    marginBottom: 20,
  },
  voiceItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  selectedVoiceItem: {
    backgroundColor: '#f1f1f1',
    borderColor: '#388E3C',
    borderWidth: 2,
  },
  voiceText: {
    fontSize: 16,
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor:'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  testButton: {
    backgroundColor: '#e9ecef',
    padding: 8,
    borderRadius: 4,
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: '600'
  },
  gradientContainer: {
    borderRadius: 25,
    padding: 2,
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0b0b0b',
  },

});

export default VoiceList;
