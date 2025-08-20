import { Image, StyleSheet, Dimensions, Animated, Keyboard, Text, View, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, FlatListComponent, TextInput, Alert } from 'react-native'
import React, { useEffect, useCallback, useState, useRef } from 'react'

import * as FileSystem from 'expo-file-system'
import * as ClipBoard from "expo-clipboard"
import * as Speech from "expo-speech"
import * as SecureStore from "expo-secure-store"
import { openComposer } from 'react-native-email-link'
import * as Sharing from "expo-sharing"
import { useFocusEffect } from '@react-navigation/native';


import { Ionicons, MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';
const { height: screenHeight } = Dimensions.get('window');

const Chats = () => {

  const [areFilesSelected, setAreFilesSelected] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<String[]>([])

  //================================== File opened ===========================================

  const [isFileOpened, setIsFileOpened] = useState(false)
  const [openedFilename, setOpendFilename] = useState("")
  const [FileData, setFileData] = useState<Chat[]>([])

  useFocusEffect(
    useCallback(() => {
      if (isFileOpened && openedFilename) {
        openFile(openedFilename);
      }
    }, [isFileOpened, openedFilename])
  );

  type Chat = {
    id: number;
    prompt: string;
    output: string | undefined; // Or make it optional
    fileSelected: boolean;
    files: {
      name: string;
      mimeType?: string; // Optional mimeType
      path: string;
      encodedData: string;
    } | undefined;
  };

  const openFile = async (file: string) => {

    try {
      const filePath = FileSystem.documentDirectory + "/" + file
      if (!filePath) {
        console.warn("Filepath is not provided");
        return;
      }
      setOpendFilename(file);
      setIsFileOpened(true);
      setMoreClicked(false);
      console.log("Reading File:", filePath);
      const fileContent = await FileSystem.readAsStringAsync(filePath);
      const parsedData = JSON.parse(fileContent);
      setFileData(parsedData)

      console.log("Successfully read and set the chat data.");
    } catch (error) {
      console.error("Error reading or parsing file:", error);
    }
  };

  //================================ File Operations =======================================

  const deleteFiles = async (selectedFiles: String[]) => {
    try {
      if (FileSystem.documentDirectory == null) {
        Alert.alert('Error', 'Document directory is not available.');
        return;
      }

      if (selectedFiles.length === 0) {
        Alert.alert('No Files Selected', 'Please select files to delete.');
        return;
      }
      for (const file of selectedFiles) {
        const filePath = FileSystem.documentDirectory + file;
        const fileInfo = await FileSystem.getInfoAsync(filePath);

        if (fileInfo.exists) {
          console.log('Deleting File:', filePath);
          try {
            await FileSystem.deleteAsync(filePath);
            console.log('file deleted:', filePath);
          } catch (deleteError) {
            console.error('err deleting file:', deleteError);
          }

        } else {
          console.warn('File does not exist:', filePath);
        }
      }
      readFilenames()
      setAreFilesSelected(false)
      setSelectedFiles([])
      setIsFileOpened(false)
      setOpendFilename('')
      Alert.alert('Success', 'Selected files deleted successfully.');
    } catch (error) {
      console.error('Failed to delete files:', error);
      Alert.alert('Error', 'An error occurred while deleting files.');
    }
  };

  const renameFile = async (file: String, newName: string) => {

    const oldFilePath = FileSystem.documentDirectory + "/" + file;
    const newFilePath = FileSystem.documentDirectory + "/" + newName + ".json";

    try {
      const fileExists = await FileSystem.getInfoAsync(oldFilePath);
      if (!fileExists.exists) {
        Alert.alert('error', 'file does not exist');
        return;
      }
      await FileSystem.moveAsync({
        from: oldFilePath,
        to: newFilePath,
      });
      Alert.alert('Success', 'File renamed successfully.');
      readFilenames();
      setSelectedFiles([]);
      setAreFilesSelected(false);
      if (isFileOpened === true) {
        setOpendFilename(newFileName + ".json")
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to rename file.');
    }
  };

  const [fileDetails, setFileDetails] = useState<FileSystem.FileInfo | null>(null);

  const getFileDetails = async (file: String) => {
    const filePath = FileSystem.documentDirectory + "/" + file;

    try {
      const details = await FileSystem.getInfoAsync(filePath, { size: true });
      if (!details.exists) {
        Alert.alert('error', 'file does not exist');
        return;
      }
      setFileDetails(details);
      console.log(details);
      Alert.alert(
        'File Details',
        'URI: ' + details.uri +
        '\nSize: ' + (details.size || 'Unknown') + ' bytes' +
        '\nLast Modified: ' +
        (details.modificationTime
          ? new Date(details.modificationTime * 1000).toLocaleString()
          : 'Unknown')
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to get file details.');
    }
  };

  const shareFile = async (file: String) => {

    const filepath = FileSystem.documentDirectory + "/" + file

    try {
      await Sharing.shareAsync(filepath);
    } catch (error) {
      Alert.alert('Error', 'Failed to share file.');
    }
  };

  // ================================ Current File =============================================

  const setCurrentFile = async (currFile: String) => {
    try {
      await SecureStore.setItemAsync("Current_Filename", currFile as string)
      await SecureStore.setItemAsync("Current_Filepath", FileSystem.documentDirectory + "/" + currFile)
      alert("Set Current File as : " + String(currFile))
      setAreFilesSelected(false)
      setSelectedFiles([])
    } catch (err) {
      console.log(err)
    }
  }


  // =============================== search function =======================================

  const [choseSearch, setChoseSearch] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchResultFiles, setSearchResultFiles] = useState<String[]>()

  useEffect(() => {
    searchFiles()
  }, [searchInput])

  const searchFiles = async () => {
    try {
      const files = availableFilenames?.filter((file: String) =>
        file.toLowerCase().includes(searchInput.trim().toLowerCase())
      );
      setSearchResultFiles(files);
    } catch (error) {
      console.log("Error Searching Files", error)
    }
  };

  // ========================= Dummy Files creating Function ====================================

  const createDummyFiles = async () => {
    const path = FileSystem.documentDirectory + "/"
    for (let i = 0; i < 25; i++) {
      const file = await FileSystem.writeAsStringAsync(
        path + "dummyFile-" + (i + 1) + ".json",
        String([])
      )
    }
    console.log("Created...")
  }

  //============================= Reading Available Files ====================================

  const [availableFilenames, setAvailableFilenames] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      readFilenames();
    }, [])
  );

  const readFilenames = async () => {
    const dirPath = FileSystem.documentDirectory + "/";
    const files: string[] = await FileSystem.readDirectoryAsync(dirPath);
    console.log(files);
    let jsonFiles: string[] = [];
    files.forEach(file => {
      if (file.endsWith(".json") && !file.startsWith("PersistedInstallation")) {
        jsonFiles.push(file);
      }
    });
    console.log("JSON Files: ", jsonFiles);
    jsonFiles.sort();
    setAvailableFilenames(jsonFiles);
  };


  //============================ Select Files ===============================================

  const selectFile = (file: string) => {
    if (areFilesSelected) {
      if (selectedFiles.includes(file)) {
        setSelectedFiles(selectedFiles.filter(item => item !== file))
        if (selectedFiles.length === 0) {
          setAreFilesSelected(false)
        }
      } else {
        setSelectedFiles([...selectedFiles, file])
      }
    } else {
      setAreFilesSelected(true)
      setSelectedFiles([...selectedFiles, file])
    }
  }

  // ================================ Copy Function =====================================

  const copyText = async (txt: string) => {
    await ClipBoard.setStringAsync(txt)
    console.log("Copied...")
  }

  //=============================== Report Function =======================================

  const [reportButtonPressed, setReportButtonPressed] = useState(-1)

  const report = async () => {
    await openComposer({
      to: "bhanuprasadgoudanegouni@gmail.com",
      subject: "Feedback || Report : From a User",
      body: '""Please Leave Your Issue Below""\n\n'
    })
  }

  //============================= Loading Voice Settings ======================================

  const [voiceData, setVoiceData] = useState<{
    voiceIdentifier: String,
    pitch: string,
    rate: string,
    volume: string,
  }>()

  useEffect(() => {
    loadVoiceData()
  }, [])

    useFocusEffect(
      useCallback(() => {
        loadVoiceData()
      }, [])
    );

  const loadVoiceData = async () => {
    const vIdentifier = await SecureStore.getItemAsync("VoiceIdentifier")
    if (vIdentifier) {
      console.log("Fetched Voice Identifier")
    } else {
      console.log("Unable to Fetch VoiceIdentifier...")
    }

    const vPitch = await SecureStore.getItemAsync("Pitch")
    if (vPitch) {
      console.log("Fetched Voice Pitch...")
    } else {
      console.log("Unable to Fetch Voice Pitch...")
    }

    const vRate = await SecureStore.getItemAsync('Rate')
    if (vRate) {
      console.log("Fetched Voice Rate...")
    } else {
      console.log("Unable to Fetch Voice Rate...")
    }

    const vVol = await SecureStore.getItemAsync('Volume')
    if (vVol) {
      console.log("Fetched Voice Volume...")
    } else {
      console.log("Unable to Fetch Voice Volume...")
    }
    let v = {
      voiceIdentifier: vIdentifier ? vIdentifier : '',
      pitch: vPitch ? vPitch : '',
      rate: vRate ? vRate : '',
      volume: vVol ? vVol : ''
    }
    setVoiceData(v)
  }

  //================================ Speech Functions =============================================

  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    setIsSpeaking(false)
  }, [])

  const speakText = async (txt: String) => {
    if (txt === "** Error Connecting to the server. **\n ** Please try again later... **") {
      txt = "I am facing " + txt
      console.log("added")
    }
    let symbols = ["#", "$", "`", "_", "-", "{", "}", "[", "]", "<", ">", ":", "*"]
    for (let i = 0; i < symbols.length; i++) {
      txt = txt.split(symbols[i]).join("")
    }

    setIsSpeaking(true)
    await Speech.speak(String(txt), {
      voice: voiceData ? String(voiceData.voiceIdentifier) : String("en-AU-language"),
      pitch: voiceData ? Number(voiceData.pitch) : 1.0,
      rate: voiceData ? Number(voiceData.rate) : 1.0,
      volume: voiceData ? Number(voiceData.volume) : 1.0,

      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    })

  }



  const stopSpeaking = async () => {
    setIsSpeaking(false)
    await Speech.stop()
  }

  // ============================= Respnse display Fuction =================================

  const polish = (output: string) => {
    const formattedResponse: any = [];
    let codeContent = ""; // To hold content of the code block
    let isInCodeBlock = false;
    let language = "";

    // Split the output into lines
    const parts = output.split("\n");

    parts.forEach((part, index) => {
      // Handle code block start and end
      if (part.startsWith("```")) {
        if (!isInCodeBlock) {
          isInCodeBlock = true;
          language = part.slice(3).trim(); // Extract language after ```
        } else {
          isInCodeBlock = false;
          // Render code block
          formattedResponse.push(
            <View key={`code-${index}`} style={{ marginVertical: 10 }}>
              <View style={{ flexDirection: 'row', backgroundColor: "gray", padding: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <View style={{ width: '60%' }}>
                  <Text style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>{language || "Code"}</Text>
                </View>
                <TouchableOpacity onPress={() => copyText(output.substring(output.indexOf("\n", output.indexOf("```") + 3), output.lastIndexOf("```")))}
                  style={{ width: '40%', borderRadius: 15, backgroundColor: 'lightgray', paddingHorizontal: "5%", paddingVertical: "2.5%" }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Ionicons name='copy' size={17} marginRight={5} />
                    <Text style={{ fontWeight: 'bold' }}>Copy</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ScrollView horizontal style={{ backgroundColor: "#f4f4f4", padding: 15, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <Text style={{ fontFamily: "monospace" }}>{codeContent.trim()}</Text>
              </ScrollView>
            </View>
          );
          codeContent = ""; // Reset code content
        }
        return;
      }

      if (isInCodeBlock) {
        codeContent += part + "\n"; // Append code lines
        return;
      }

      // Handle bullet points (* or - at the start)
      if (part.trim().startsWith("* ") || part.trim().startsWith("- ")) {
        const bulletText = part.trim().slice(2); // Extract text after bullet
        const parsedBullet = parseMarkdown(bulletText); // Parse Markdown-style bold

        formattedResponse.push(
          <View key={`list-${index}`} style={{ flexDirection: "row", alignItems: "flex-start", marginVertical: 2 }}>
            <Text style={{ fontWeight: "bold", marginRight: 5 }}>•</Text>
            <Text>{parsedBullet}</Text>
          </View>
        );
        return;
      }

      // Regular text
      if (part.trim()) {
        const parsedText = parseMarkdown(part); // Parse Markdown-style bold
        formattedResponse.push(
          <Text key={index} style={{ marginVertical: 5 }}>{parsedText}</Text>
        );
      }
    });

    return <View style={{ padding: 10 }}>{formattedResponse}</View>;
  };

  // Helper function to parse Markdown-style text (e.g., **bold**)
  const parseMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/); // Split text by bold markers
    return parts.map((segment, index) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        return (
          <Text key={index} style={{ fontWeight: "bold" }}>
            {segment.slice(2, -2)} {/* Remove ** markers */}
          </Text>
        );
      }
      return <Text key={index}>{segment}</Text>;
    });
  };

  //============================== KeyBoard Availablity ====================================

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //================================ Layout Functions ========================================

  const [isRenameFileClicked, setIsRenameFileClicked] = useState(false)
  const [newFileName, setNewFileName] = useState("")

  const renameLayout = () => (
    <KeyboardAvoidingView behavior="padding">
      <Modal visible transparent animationType="fade">
        <LinearGradient style={[styles.renameFile, isKeyboardVisible ? { minHeight: '40%', marginTop: '50%' } : null]}
          colors={['#7928CA', '#FF0080']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} >
          <Text style={[styles.modalTitle]}>
            Rename File
          </Text>
          <TouchableOpacity onPress={() => { setIsRenameFileClicked(false); setNewFileName(''); }} style={{ position: 'absolute', top: '10%', right: '10%' }}>
            <Ionicons name="close" size={30} color={'#1b2035'} />
          </TouchableOpacity>
          <TextInput
            value={newFileName as string || ''}
            onChangeText={setNewFileName}
            style={styles.input}
            placeholder="Enter file name"
            autoCorrect={true}
            autoCapitalize='words'
          />
          <TouchableOpacity
            onPress={() => {
              renameFile(selectedFiles[0], newFileName).then(() => {
                setIsRenameFileClicked(false);
                setNewFileName('');
              })
            }}
            style={[styles.createButton]}
          >
            <Text style={[styles.createButtonText]}>Create</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </KeyboardAvoidingView>
  );

  const [moreClicked, setMoreClicked] = useState(false)
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (isFileOpened === false) {
      HeaderLayout()

    }
  }, [isFileOpened])


  const toggleSlidingWindow = () => {
    if (!moreClicked) {
      setMoreClicked(true);
      Animated.timing(slideAnim, {
        toValue: screenHeight - 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMoreClicked(false));
    }
  };

  const HeaderLayout = () => {

    if (isFileOpened === true) {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 18,
            paddingVertical: 18,
            backgroundColor: 'white',
          }}
        >
          <View>
            <TouchableOpacity onPress={() => [setIsFileOpened(false), setOpendFilename("")]}>
              <Ionicons name="chevron-back-outline" size={30} color="#0b0b0b" />
            </TouchableOpacity>
          </View>
          {!moreClicked && (
            <View>
              <ScrollView horizontal>
                <Text style={{ fontSize: 22, fontWeight: '600' }}>{openedFilename}</Text>
              </ScrollView>
            </View>
          )}
          <View style={{ flexDirection: 'row-reverse' }}>
            <TouchableOpacity onPress={() => setMoreClicked(!moreClicked)}>
              <Entypo name={"dots-three-vertical"} size={25} color="#0b0b0b" />
            </TouchableOpacity>
            {moreClicked ? (
              <View style={{
                flexDirection: 'row',
                borderRadius: 30,
                paddingHorizontal: 10,
              }}>
                <TouchableOpacity onPress={() => shareFile(openedFilename)}>
                  <FontAwesome5 name='share' size={22} color="#0b0b0b" marginHorizontal={10} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteFiles([openedFilename])}>
                  <MaterialCommunityIcons name='delete-empty' size={22} color="#0b0b0b" marginHorizontal={10} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getFileDetails(openedFilename)}>
                  <Ionicons name="information-circle" size={24} color="#0b0b0b" marginHorizontal={10} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => [setIsRenameFileClicked(true), setSelectedFiles([openedFilename])]}>
                  <Ionicons name='create' size={23} color="#0b0b0b" marginHorizontal={10} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentFile(openedFilename)}>
                  <FontAwesome5 name='check' size={24} color="#0b0b0b" marginHorizontal={10} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      )
    }
    return (
      <View>
        {areFilesSelected === false ? (
          <View style={{ paddingHorizontal: 6, paddingVertical: 16, }}>
            {choseSearch === false ? (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ marginLeft: 6, fontSize: 24, fontWeight: 600 }}>Chats</Text>
                </View>
                <View style={{ marginTop: 5, marginRight: '5%' }}>
                  <TouchableOpacity onPress={() => choseSearch === false ? setChoseSearch(true) : null}>
                    <Ionicons name='search' size={25} color={'#0b0b0b'} />
                  </TouchableOpacity>
                </View>
              </View>

            ) : (
              <View style={{
                flexDirection: 'row',
                marginTop: screenHeight * 0.00,
                paddingHorizontal: 6,
              }}>
                <View >
                  <TouchableOpacity onPress={() => [setChoseSearch(false), setSearchResultFiles([]), setSearchInput("")]}>
                    <Ionicons name="chevron-back-outline" size={30} color="#0b0b0b" style={{ marginTop: 7 }} />
                  </TouchableOpacity>
                </View>
                <LinearGradient
                  colors={['#7928CA', '#FF0080']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }} style={{
                    borderRadius: 25,
                    padding: 2,
                    flex: 1,
                  }}>
                  <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    borderRadius: 25,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                  }}>
                    <TextInput
                      value={searchInput}
                      onChangeText={setSearchInput}
                      placeholder="Search..."
                      style={{
                        flex: 1,
                        height: 44,
                        color: 'black',
                      }}
                    />
                    <TouchableOpacity onPress={() => searchFiles()}>
                      <Ionicons name='search' size={25} color={'#0b0b0b'} />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            )}
          </View>
        ) : (

          <View style={{ flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 8, alignItems: 'flex-start', }}>
            <View >
              <TouchableOpacity onPress={() => [setAreFilesSelected(false), setSelectedFiles([])]}>
                <Ionicons name="chevron-back-outline" size={28} color="#0b0b0b" />
              </TouchableOpacity>
            </View>

            <LinearGradient style={{ flexDirection: 'column', padding: 10, borderRadius: 12, }}
              colors={['#7928CA', '#FF0080']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }} >

              <TouchableOpacity onPress={() => deleteFiles(selectedFiles)} style={styles.actionButton}  >
                <MaterialCommunityIcons name='delete-empty' size={24} color="#ffdafe" />
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>

              {selectedFiles.length <= 1 ? (
                <View style={{ flexDirection: 'column'  }}>

                  <TouchableOpacity onPress={() => shareFile(selectedFiles[0])} style={styles.actionButton}>
                    <FontAwesome5 name='share' size={24} color="#ffdafe" />
                    <Text style={styles.actionText}>Share</Text>

                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => getFileDetails(selectedFiles[0])} style={styles.actionButton}>
                    <Ionicons name="information-circle-sharp" size={24} color="#ffdafe" />
                    <Text style={styles.actionText}>Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setIsRenameFileClicked(true)} style={styles.actionButton}>
                    <Ionicons name='create' size={24} color="#ffdafe" />
                    <Text style={styles.actionText}>Rename</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setCurrentFile(selectedFiles[0])} style={styles.actionButton}>
                    <FontAwesome5 name='check' size={24} color="#ffdafe" />
                    <Text style={styles.actionText}>Set as Current File</Text>
                  </TouchableOpacity>

                </View>
              ) : (null)}
            </LinearGradient>
          </View>
        )
        }
      </View >
    )
  }

  const searchFilesView = () => {
    return (
      <ScrollView>
        {searchResultFiles?.map((file, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => [areFilesSelected ? selectFile(String(file)) : openFile(String(file))]}
              onLongPress={() => [setAreFilesSelected(true), selectFile(String(file))]}
            >
              {areFilesSelected ? (
                <View style={[styles.filenameView, { flexDirection: 'row' }]}>
                  <View style={styles.selectedFilenameView}>
                    <Text style={styles.filename}>{file}</Text>
                  </View>
                  <View style={styles.selectionIcon}>
                    {selectedFiles.includes(file) ? (
                      <Ionicons name="checkmark-circle" size={27} />
                    ) : (
                      <Ionicons name="radio-button-off" size={27} />
                    )}
                  </View>
                </View>
              ) : (
                <View style={styles.unselectedFileView}>
                  <Text style={styles.filename}>{file}</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.diffLine} />
          </View>
        ))}
      </ScrollView>
    )
  }

  const FileListView = () => {
    return (
      <ScrollView>
        {availableFilenames?.map((file, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => [areFilesSelected ? selectFile(String(file)) : openFile(String(file))]}
              onLongPress={() => [setAreFilesSelected(true), selectFile(String(file))]}
            >
              {areFilesSelected ? (
                <View style={[styles.filenameView, { flexDirection: 'row' }]}>
                  <View style={styles.selectedFilenameView}>
                    <Text style={styles.filename}>{file}</Text>
                  </View>
                  <View style={styles.selectionIcon}>
                    {selectedFiles.includes(file) ? (
                      <Ionicons name="checkmark-circle" size={27} />
                    ) : (
                      <Ionicons name="radio-button-off" size={27} />
                    )}
                  </View>
                </View>
              ) : (
                <View style={styles.unselectedFileView}>
                  <Text style={styles.filename}>{file}</Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={styles.diffLine} />
          </View>
        ))}
      </ScrollView>
    )
  }

  const FileOpenedView = () => {
    return (
      <ScrollView style={{ paddingHorizontal: 15 }}>
        {FileData.map((chatItem, index) => (
          <View key={index} style={{ flex: 1 }}>

            {chatItem.prompt !== "" ? (
              <View style={styles.prompt}>
                {chatItem.fileSelected === true ? (

                  <View style={styles.fileDisplay}>

                    <View style={{ height: 55, minWidth: "45%", width: 'auto' }}>
                      {chatItem.files?.mimeType?.startsWith("image/") || chatItem.files?.mimeType?.startsWith("video/") ? (

                        <View style={{ flexDirection: 'row' }}>

                          <View>
                            <Image source={{ uri: chatItem.files.path }} height={40} width={40} style={{ marginTop: 8, borderRadius: 8 }} />
                          </View>

                          <View style={{ marginLeft: "5%" }}>
                            <ScrollView horizontal style={{ width: "100%" }}>
                              <Text>{chatItem.files.name}</Text>
                            </ScrollView>
                            <ScrollView horizontal>
                              <Text>{chatItem.files.mimeType}</Text>
                            </ScrollView>
                          </View>
                        </View>
                      ) : (
                        <View style={{ flexDirection: 'row' }}>
                          <Ionicons name='document-text' size={40} />
                          <View style={{ marginLeft: "3%", marginTop: 5 }}>
                            <ScrollView horizontal>
                              <Text>{chatItem.files?.name}</Text>
                            </ScrollView>
                            <ScrollView horizontal>
                              <Text>{chatItem.files?.mimeType}</Text>
                            </ScrollView>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                ) : (null)}
                {chatItem.fileSelected === false ? null : <Text />}
                <Text selectable style={{ padding: 5 }}>{chatItem.prompt}</Text>
              </View>
            ) : null}
            {chatItem.output == "" ?
              <View
                style={styles.response}
              >
                <Image style={{ height: 30, width: 30 }} source={require('../assets/images/loading.gif')} height={1} width={1} />
              </View>
              :
              <LinearGradient
                colors={['#e9ecef', '#e9ecef']}
                style={[styles.response, { flex: 1 },]}>
                <View>
                  <Text style={{ color: '#e9ecef' }}>
                    {polish(String(chatItem.output))}
                  </Text>
                  <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => isSpeaking ? stopSpeaking() : speakText(String(chatItem.output))}>

                      <Ionicons
                        name={isSpeaking === false ? 'volume-high' : 'volume-mute'}
                        size={18}
                        marginLeft={"15%"} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => copyText(String(chatItem.output))}>
                      <Ionicons name='copy' size={16} marginLeft={"15%"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        setReportButtonPressed(reportButtonPressed === chatItem.id ? -1 : chatItem.id)}>
                      <Ionicons name="ellipsis-vertical" size={17} style={{ marginLeft: '15%' }} />
                    </TouchableOpacity>

                    {reportButtonPressed === chatItem.id && (<View style={{ position: 'static' }}>
                      <TouchableOpacity onPress={report}>
                        <View
                          style={{
                            borderRadius: 10,
                            backgroundColor: 'red',
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                          }}>
                          <Text style={{ color: '#fff', textAlign: 'center' }}>Report</Text>

                        </View>
                      </TouchableOpacity>
                    </View>
                    )}
                  </View>
                </View>
              </LinearGradient>
            }
          </View>
        ))}
        <Text />
      </ScrollView>
    )
  }

  //=============================== Main Function Layout ===========================================

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        {HeaderLayout()}
      </View>
      {isRenameFileClicked ? renameLayout() : null}
      <View>
        {isFileOpened === false ? (
          searchInput.trim() === "" ? FileListView() : searchFilesView()
        ) : (
          FileOpenedView()
        )}
      </View>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: '35%',
    padding: 8

  },
  bottombar: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: 'white',
  },
  unselectedFileView: {
    paddingVertical: 15,
    paddingHorizontal: 16,

  },
  filenameView: {
    height: 60,
  },
  filename: {
    fontSize: 18,
    fontWeight: 500
  },
  diffLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 2,
    paddingTop: 2,
  },
  selectedFilenameView: {
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 17,

  },
  selectionIcon: {
    width: '20%',
    height: '100%',
    paddingHorizontal: 15,
    paddingVertical: 17

  },
  response: {
    marginVertical: 5,
    backgroundColor: 'yellow',
    width: 'auto',
    padding:8,
    maxWidth: '90%',
    alignSelf: 'flex-start',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,

  },

  fileDisplay: {
    backgroundColor: '#CFF8F8',
    flexDirection: 'row',
    height: 'auto',
    padding: 10,
    borderRadius: 12.5,
  },

  prompt: {
    marginVertical: 2,
    backgroundColor: '#e9ecef',
    alignSelf: 'flex-end',
    width: 'auto',
    maxWidth: "80%",
    padding: 8,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  renameFile: {
    marginTop: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9ECEF',
    padding: 45,
    borderRadius: 12,
    margin: 20,
  },
  iconButton: {
    marginRight: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    marginLeft: 10,
    color: '#ffdafe',
    fontWeight: 400,
    fontSize: 13,
  },
  modalTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: 'white'
  },
  createButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1b2035',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 12,
    padding: 12,
  },
})
