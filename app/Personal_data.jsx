import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const PersonalData = () => {
  const [name, setName] = useState('');
  const [assistantName, setAssistantName] = useState('');
  const [age, setAge] = useState('');
  const [profField, setProfField] = useState('');
  const [engProf, setEngProf] = useState('');
  const [prefCommStyle, setPrefCommStyle] = useState('');
  const [techProf, setTechProf] = useState('');
  const [isEngProfModalVisible, setEngProfModalVisible] = useState(false);
  const [isCommStyleModalVisible, setCommStyleModalVisible] = useState(false);

  const engProfOptions = ['Beginner', 'Intermediate', 'Advanced', 'Native'];
  const commStyleOptions = ['Casual', 'Formal', 'Detailed', 'Concise'];

  useEffect(() => {
    getPersonalData();
  }, []);

  const savePersonalData = async () => {
    await SecureStore.setItemAsync('Name', name);
    await SecureStore.setItemAsync('Assistant_Name', assistantName);
    await SecureStore.setItemAsync('Age', age);
    await SecureStore.setItemAsync('Professional_Field', profField);
    await SecureStore.setItemAsync('English_Proficiency', engProf);
    await SecureStore.setItemAsync('Preferred_Communication_Style', prefCommStyle);
    await SecureStore.setItemAsync('Technical_Proficiency', techProf);

    alert('Personal Data saved Successfully...');
  };

  const getPersonalData = async () => {
    const fields = [
      { key: 'Name', setter: setName },
      { key: 'Assistant_Name', setter: setAssistantName },
      { key: 'Age', setter: setAge },
      { key: 'Professional_Field', setter: setProfField },
      { key: 'English_Proficiency', setter: setEngProf },
      { key: 'Preferred_Communication_Style', setter: setPrefCommStyle },
      { key: 'Technical_Proficiency', setter: setTechProf },
    ];

    for (const field of fields) {
      const result = await SecureStore.getItemAsync(field.key);
      if (result) field.setter(result);
    }
  };

  const renderModal = (visible, options, onSelect, onClose) => (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Text style={styles.modalCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.containerScroll}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Personal Data</Text>
        </View>
        <View>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Assistant Name:</Text>
          <TextInput
            value={assistantName}
            onChangeText={setAssistantName}
            style={styles.input}
            placeholder="Enter assistant's name"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Enter Your Age</Text>
          <TextInput
            value={age}
            onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            style={styles.input}
            placeholder="Enter Your Age"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>Enter your Field (or) Area of Study:</Text>
          <TextInput
            value={profField}
            onChangeText={setProfField}
            style={styles.input}
            placeholder="Enter your Field"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>English Proficiency:</Text>
          <TouchableOpacity
            onPress={() => setEngProfModalVisible(true)}
            style={styles.pickerButton}
          >
            <Text style={styles.pickerButtonText}>
              {engProf || 'Select Your English Proficiency'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Preferred Communication Style:</Text>
          <TouchableOpacity
            onPress={() => setCommStyleModalVisible(true)}
            style={styles.pickerButton}
          >
            <Text style={styles.pickerButtonText}>
              {prefCommStyle || 'Select Your Preferred Communication Style'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Enter Your Technical Expertise:</Text>
          <TextInput
            value={techProf}
            onChangeText={setTechProf}
            style={styles.input}
            placeholder="Enter Technical Expertise"
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity onPress={savePersonalData} style={styles.button}>
            <Text style={styles.buttonText}>Save Data</Text>
          </TouchableOpacity>
        </View>
      </View>

      {renderModal(
        isEngProfModalVisible,
        engProfOptions,
        setEngProf,
        () => setEngProfModalVisible(false)
      )}
      {renderModal(
        isCommStyleModalVisible,
        commStyleOptions,
        setPrefCommStyle,
        () => setCommStyleModalVisible(false)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Styles remain the same except for modal-related styles
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#34495e',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#2c3e50',
  },
  pickerButton: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    marginBottom: 20,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'black',
    height: 50,
    width: 120,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#34495e',
  },
  modalCloseButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  modalCloseText: {
    fontSize: 16,
    color: 'red',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#34495e',
  },
});

export default PersonalData;
