import React, { useEffect, useState } from 'react';
import { useVideoPlayer, VideoView, VideoSource } from 'expo-video'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, LayoutAnimation, UIManager, Platform, Dimensions, SafeAreaView, KeyboardAvoidingView, Linking } from 'react-native';
import Feather from '@expo/vector-icons/Ionicons';
import * as ClipBoard from 'expo-clipboard'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const deviceHeight = Dimensions.get('window').height;
const TAB_BAR_HEIGHT = 60;

const Help = () => {

  const [visibleAnswer, setVisibleAnswer] = useState(-1);


  const [isStepsClicked, setIsStepsClicked] = useState(false)
  const [isVideoClicked, setIsVideoClicked] = useState(false)

  useEffect(()=>{
    if(visibleAnswer !== 1){
      setIsStepsClicked(false)
      setIsVideoClicked(false)
    }
  },[visibleAnswer])


  const assetId = require("../assets/images/API_Help.mp4")

  const videoSource: VideoSource = {
    assetId,
    metadata: {
      title: "Steps for Creating API"
    }
  }
  const player1 = useVideoPlayer(assetId)
  const player2 = useVideoPlayer(videoSource)

  const [currentPlayer, setCurrentPlayer] = useState(player1)

  const renderHelpLayout = () => {
        if (isStepsClicked === false && isVideoClicked === true) {
          return (
            <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', borderRadius: 5, padding: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: '700' }}>Video : </Text>
              <Text />
              <VideoView style={{ height: 180, width: '90%', marginHorizontal : 'auto' }}
                player={currentPlayer} nativeControls />
              <Text />
              <Text style={{ fontWeight: '500' }}>Google AI Website:</Text>
              <Text> [
                <TouchableOpacity onPress={() => Linking.openURL("https://aistudio.google.com")} onLongPress={() => ClipBoard.setStringAsync('https://aistudio.google.com')}>
                  <Text selectable style={{ color: 'blue', top: 5, paddingHorizontal: 5 }}>https://aistudio.google.com</Text>
                </TouchableOpacity>
                ] </Text>
            </View>
          )
        } else if (isStepsClicked === true && isVideoClicked === false) {
          return (
            <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', borderRadius: 5, padding: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: '700' }}>Steps : </Text>
              <Text />
              <View style={{ height: "auto" }}>
                <Text>1. Visit the Google AI Studio by using the Below Link : </Text>
                <Text> [
                  <TouchableOpacity onPress={() => Linking.openURL("https://aistudio.google.com")} onLongPress={() => ClipBoard.setStringAsync('https://aistudio.google.com')}>
                    <Text selectable style={{ color: 'blue', top: 5, paddingHorizontal: 5 }}>https://aistudio.google.com</Text>
                  </TouchableOpacity>
                  ] </Text>
                <Text />
                <Text>2. If You are Directly Logged-in by Google, The Process will proceed automatically. If not, Sign-in with your Google Account.</Text>
                <Text />
                <Text>3. Click on the "<Text style={{ fontWeight: 'bold' }} >Get API Key</Text>" Button on the <Text style={{ fontWeight: 'bold' }}>Menu Bar</Text> on the Left side.</Text>
                <Text />
                <Text>4. Click on the "<Text style={{ fontWeight: 'bold' }}>Create API Key</Text>" Button to generate a new key for the project.</Text>
                <Text />
                <Text>5. When new API Key is created. Click on the API key section. Copy the API Key and paste it in the API Key field in the Amigo APP</Text>
              </View>
            </View>
          )
        }
      }


  const faqs = [
    { 
      question: "What is Amigo?", 
      answer: "Amigo is an AI-powered assistant designed to help you with daily tasks, answer queries, and provide personalized interactions to the user." 

    },
    { 
      question: "How do I create a Gemini API?", 
      answer: 
      <View>
        <Text>It is very easy to create to create a Gemini API Key. You can just go through the following sections where you can find steps in both textual and video format.</Text>
        <Text>
          For Steps :
          <TouchableOpacity onPress={() => [setIsStepsClicked(!isStepsClicked), setIsVideoClicked(false)]}>
            <Text style={{ marginLeft: 10, fontSize: 13, top: 4, color: 'blue' }}>Click Here</Text>
          </TouchableOpacity>
        </Text>
        <Text>
          For Video :
          <TouchableOpacity onPress={() => [setIsVideoClicked(!isVideoClicked), setIsStepsClicked(false)]}>
            <Text style={{ marginLeft: 10, fontSize: 13, top: 4, color: 'blue' }}>Click Here</Text>
          </TouchableOpacity>
        </Text>
        {renderHelpLayout()}
        <Text />
      </View>
    },
    { 
      question: "How do I set up Amigo for the first time?", 
      answer: 
      <View>
        <Text>Amigo is very simple app to use. If you have freshly installed our app or find difficulty Amigo, You can go through the following steps.</Text>
        <Text/>
        <View style={{flexDirection : 'row'}}>
          <View>
            <Text>1. </Text>
          </View>
          <View>
          <Text>To Interact with Amigo, First go to <Text style={{fontWeight : 'bold'}}>Settings</Text> of Amigo.</Text>
          </View>
        </View>
        <Text/>
        <View style={{flexDirection : 'row'}}>
          <View>
            <Text>2. </Text>
          </View>
          <View>
          <Text>Click on <Text style={{fontWeight : 'bold'}}>Personal Details</Text> and Update your details.</Text>
          </View>
        </View>
        <Text/>
        <View style={{flexDirection : 'row'}}>
          <View>
            <Text>3. </Text>
          </View>
          <View>
          <Text>Then You can go to <Text style={{fontWeight : 'bold'}}>Home</Text> and <Text style={{fontWeight : 'bold'}}>Create a New File</Text> (using <Text style={{fontWeight : 'bold'}}>Create</Text> Button), Which is completely optional. But Recommended for Better Experience</Text>
          </View>
        </View>
        <Text/>
        <View style={{flexDirection : 'row'}}>
          <View>
            <Text>4. </Text>
          </View>
          <View>
          <Text>Finally, You can have a Personalized conversation with Your AI Assistant</Text>
          </View>
        </View>
        <Text/>
        <View style={{flexDirection : 'row'}}>
          <View>
            <Text>5. </Text>
          </View>
          <View>
          <Text>You can View your Previous Chats with Your Assistant on the <Text style={{fontWeight: 'bold'}}>Chats</Text> section.</Text>
          </View>
        </View>
      </View>
    },
    { 
      question: "How can I interact with Amigo?", 
      answer: 
      <View>
        <Text>You can Directly ask any question to Amigo, on the <Text style={{fontWeight : 'bold'}}>Home</Text> screen and Amigo Will Answer your question there.</Text>
        <Text/>
        <Text>( Note that Amigo can only provide Personalized Experience. If Your Personal Details are correctly Configured. Otherwise, You will get a general response similar to Other Generative AI models online.)</Text>
      </View> 
    },
    { 
      question: "What should I do if the API is created but not validating on Amigo?", 
      answer: 
      <View>
        <Text/>
        <View style={{flexDirection : 'row'}}>
          <Text>1. </Text>
          <Text>Firstly, Cross check the API Key on the AI Studio Platform.</Text>
        </View>
        <Text/>
        <View style={{flexDirection : 'row'}}>
          <Text>2. </Text>
          <Text>If you see any change in API key just replace the Previous API Key on the <Text style={{fontWeight:'bold'}}>Settings</Text> screen with the New Key. Then You can go to <Text style={{fontWeight : 'bold'}}>Home</Text> screen,  and Interact with Amigo.</Text>
        </View>
        <Text/>
        <View style={{flexDirection : 'row'}}>
          <Text>3. </Text>
          <Text>If the API Key is same on the AI Studio. Then this is could be a Network issue with the Gemini Server. Please Wait for Sometime and Try Again Later</Text>
        </View>
      </View>
    },
    { question: "Where are my chat files stored?", answer: "All Your Chat files are Securely stored in the app's Local storage to ensure your privacy." },
    { question: "If I delete the app, are my chats permanently deleted?", answer: "Yes, because the app's local storage is cleared during the uninstallation process, permanently deleting your chats." },
    { question: "Can I rename a chat file?", answer: "Yes, you can rename any chat file from the Chats page. Select the file, tap the options menu, and choose 'Rename.'" },
    { question: "How do I search for a specific chat file?", answer: "Use the search bar on the Chats page to find specific chat files quickly." },
    { question: "How do I delete a chat file?", answer: "On the Chats page, select the chat file you want to delete, tap the options menu, and choose 'Delete.'" },
    { question: "How do I share a chat file?", answer: "To share a chat file, go to the Chats page, select the desired file, and use the 'Share' option from the menu." },
    { question: "How do I update my profile information?", answer: "Navigate to the Settings page> Personal Details and edit your preferences." },
    { question: "Can I change the assistant’s name?", answer: "Yes, go to the Settings page > Personal Information and update the assistant’s name to personalize your experience." },
    { question: "How do I update my personal information?", answer: "You can update your personal information in the Settings page under the 'Personal Information' section." },
    { question: "Can I customize Amigo’s voice settings?", answer: "Yes, you can customize voice settings like pitch, volume, and rate in the 'Voice Information' section on the Settings page." },
    { question: "How can I secure my API key?", answer: "Your API key is secured with biometric authentication. You’ll need to confirm your identity using your biometric credentials to view or update it.\n\n However, you may turn it OFF if face continuous issues with your Biometrics Scanner. Note that if your Biometric authentication is OFF, Everyone using your device can access it." },
    { question: "How do I test if my API key is valid?", answer: "In the 'API Key' section of the Settings page, there's an option to test your API key. It will notify you if the key is valid or not." },
    { question: "What should I do if I keep getting an error?", answer: "Continuous errors may occur due to API key issues or network problems. Try again later or verify the API key's validity if the issue persists." },
    { question: "Why can’t I hear Amigo’s voice?", answer: "Ensure your device’s volume is up and the Voice Settings in the app are enabled." },
    { question: "What makes Amigo different from other assistants?", answer: "Amigo personalizes its responses based on your preferences, making interactions more intuitive and user-specific." },
    { question: "Can Amigo provide real-time updates (like weather or news)?", answer: "Amigo responds to your prompts but cannot fetch real-time data like weather or news updates." },
    { question: "Can I connect Amigo with other apps?", answer: "Currently, Amigo works independently, but future updates may include integration with popular apps." },
    { 
      question: "Where can I report issues or provide feedback?", 
      answer:  
        <View>
          <Text>Use the <Text style={{fontWeight:'bold'}}>Contact us</Text> option on the in the <Text style={{fontWeight  : 'bold'}}>About</Text> page of the app to report bugs or suggest improvements.</Text>
        </View>
    },
  ];

  
  const toggleAnswer = (index: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisibleAnswer(visibleAnswer === index ? null : index);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT }} // Add space for the tab bar
        >
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.questionRow}
                onPress={() => toggleAnswer(index)}
              >
                <Text style={styles.questionText}>{faq.question}</Text>
                <Feather
                  name={visibleAnswer === index ? "chevron-up" : "chevron-down"}
                  size={28}
                  color={"black"}
                />
              </TouchableOpacity>
              {visibleAnswer === index && (
                <Animated.View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </Animated.View>
              )}
              <View style={styles.horizontalLine} />
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollView: {
    paddingHorizontal: 12,
  },
  faqItem: {
    marginBottom: 12,
    padding: 5,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  answerContainer: {
    marginTop: 8,
  },
  answerText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 20,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 12,
    paddingTop: 12,
  },
});

export default Help;
