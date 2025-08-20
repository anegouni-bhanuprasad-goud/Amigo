import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Switch } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { MaterialIcons } from '@expo/vector-icons';

const ApiSettings = () => {
  const [api, setApi] = useState('');
  const [isApiWorking, setIsApiWorking] = useState(0);
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState(false);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const biometricsAvailable = await SecureStore.isAvailableAsync();
        setIsBiometricsAvailable(biometricsAvailable);
      } catch (error) {
        console.error('Error checking biometrics:', error);
      }
    };

    const loadBiometricSetting = async () => {
      try {
        const biometricState = await SecureStore.getItemAsync('BIOMETRIC_ENABLED');
        if (biometricState !== null) {
          setIsBiometricsEnabled(biometricState === 'true'); // Convert string to boolean
        }
      } catch (error) {
        console.error('Error loading biometric setting:', error);
      }
    };

    checkBiometrics();
    getApiData();
    loadBiometricSetting(); // Load biometric setting on mount
  }, []);

  useEffect(() => {
    setIsApiWorking(0);
  }, [api]);


  const saveApiData = async () => {
    await testApi();
    if (isApiWorking === 1) {
      await SecureStore.setItemAsync(
        'API_KEY',
        api,
        isBiometricsEnabled && isBiometricsAvailable ? { requireAuthentication: true } : {}
      );
      Alert.alert('Success', 'API key saved successfully!');
    } else {
      Alert.alert('Error', 'Please enter a valid API key.');
    }
  };

  const getApiData = async () => {
    try {
      const res = await SecureStore.getItemAsync(
        'API_KEY',
        isBiometricsEnabled && isBiometricsAvailable ? { requireAuthentication: true } : {}
      );
      if (res) {
        setApi(res);
      } else {
        console.log('No API key found.');
      }
    } catch (error) {
      console.error('Error fetching API key:', error);
    }
  };

  const testApi = async () => {
    const genAI = new GoogleGenerativeAI(api);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      const result = await model.generateContent("just return 'true' if this prompt reaches you");
      if (result?.response?.candidates) {
        console.log(result.response.candidates[0].content.parts[0].text);
        setIsApiWorking(1);
      }
    } catch (err) {
      console.error('Error testing API:', err);
      setIsApiWorking(-1);
    }
  };

  const handleBiometricToggle = async (value) => {
    setIsBiometricsEnabled(value);
    try {
      await SecureStore.setItemAsync('BIOMETRIC_ENABLED', value.toString()); // Store as string
    } catch (error) {
      console.error('Error saving biometric setting:', error);
    }
  };

  const renderApiWorking = () => {
    if (isApiWorking === 1) {
      return (
        <Text style={styles.statusSuccess}>
          <MaterialIcons name="check-circle" size={20} /> API Working
        </Text>
      );
    } else if (isApiWorking === -1) {
      return (
        <Text style={styles.statusError}>
          <MaterialIcons name="error" size={20} /> API Not Working
        </Text>
      );
    } else {
      return <Text style={styles.statusDefault}>Validate</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>API Key Settings</Text>
      <TextInput
        value={api}
        onChangeText={setApi}
        placeholder="Enter your API Key"
        placeholderTextColor="#8a8a8a"
        style={styles.input}
      />
      <TouchableOpacity onPress={testApi} style={styles.validateButton}>
        {renderApiWorking()}
      </TouchableOpacity>
      
      <View style={styles.biometricsContainer}>
        <Text style={styles.biometricsText}>
          Biometrics: {isBiometricsEnabled ? 'On' : 'Off'}
        </Text>
        <Switch
          value={isBiometricsEnabled}
          onValueChange={handleBiometricToggle}
          disabled={!isBiometricsAvailable}
        />
      </View>

      <TouchableOpacity onPress={saveApiData} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save API Key</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ApiSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  validateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  statusDefault: {
    fontSize: 16,
    color: '#fff',
  },
  statusSuccess: {
    fontSize: 16,
    color: '#4CAF50',
  },
  statusError: {
    fontSize: 16,
    color: '#F44336',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  biometricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  biometricsText: {
    fontSize: 16,
  },
});
