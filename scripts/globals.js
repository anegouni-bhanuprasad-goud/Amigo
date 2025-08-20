import AsyncStorage from '@react-native-async-storage/async-storage';

let name = 'USER_NAME';

export async function getName() {
  const storedName = await AsyncStorage.getItem('name');
  return storedName || name;
}

export async function setName(newName) {
  name = newName;
  await AsyncStorage.setItem('name', newName);
}
