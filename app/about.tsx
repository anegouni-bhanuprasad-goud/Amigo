import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { openComposer } from 'react-native-email-link';

const About = () => {

  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  // Content Sections
  const sections = [
    {
      title: 'App Description',
      content:
        <View style={{ width: '90%', padding: 20 }}>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >1.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >HOME : </Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                Engage effortlessly with Gemini on the Home page, where you can initiate chats, enrich prompts by adding images or files, and seamlessly create new chat files. First-time users benefit from a guided experience, complete with step-by-step API key setup, user instructions, and a helpful video tutorial on API creation.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >2.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >CHATS :</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                The Chats page serves as your personalized repository, showcasing all your interactions with Gemini. Manage your conversations with ease—delete, share, rename, or set a chat as current. A robust search functionality helps you locate files swiftly, all securely stored in local storage to protect your privacy.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >3.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >SETTINGS :</Text>
              <View style={{ height: 6 }} />
              <View>
                <Text style={{ fontSize: 16 }}>Tailor your Amigo experience in the Settings section, which is thoughtfully segmented into:</Text>
                <Text style={{ fontSize: 16, fontWeight: 700, marginTop: 10 }}>Personal Information:</Text>
                <Text style={{ fontSize: 16 }}>Update your profile with details such as name, assistant preferences, and communication style.</Text>
                <Text style={{ fontSize: 16, fontWeight: 700, marginTop: 10 }}>API Information :</Text>
                <Text style={{ fontSize: 16 }}>Ensure the security of your API key with biometric authentication and a validation feature that confirms the API’s status.</Text>
                <Text style={{ fontSize: 16, fontWeight: 700, marginTop: 10 }}>Voice Information</Text>
                <Text style={{ fontSize: 16 }}>Customize your assistant’s voice attributes, including pitch, volume, and rate, for a more personalized interaction.</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >4.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >HELP :</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                Navigate the app with confidence using the Help page, a comprehensive resource that addresses user inquiries through clear, concise FAQs designed to enhance your user experience.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >5.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >ABOUT : </Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                Discover the essence of Amigo on the About page, featuring an insightful app overview, version details, security and privacy practices, and acknowledgments. Additionally, meet the developers, whose contact information and project roles are transparently provided to support user engagement.
              </Text>
            </View>
          </View>
        </View>
    },
    {
      title: 'App Version',
      content:
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 600 }}>Version: 1.0.0</Text>
        </View>
    },
    {
      title: 'Security and Privacy',
      content:
        <View style={{ width: '90%', padding: 20 }}>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >1.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Biometric Authentication for API Key Management:</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                To enhance security, Amigo requires biometric authentication whenever users attempt to view or update their Gemini API key, ensuring that only authorized users can access or modify sensitive information.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >2.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Local Storage for Chat Privacy:</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                User chats are securely stored in the app's local storage, preventing unauthorized access from other apps and ensuring that user conversations remain private and protected.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >3.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Controlled Chat Sharing:</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                Users have full control over sharing their chats, which can be done through a dedicated share feature on the chats page, maintaining the confidentiality of their conversations until they choose to share them.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >4.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Base64 Encryption for Files:</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                Every image and file shared within Amigo is encrypted using Base64 encoding, adding an extra layer of security to user data and preventing unauthorized access or tampering.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >5.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Data Access Restrictions: </Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                By storing sensitive data locally and implementing strict access controls, Amigo minimizes the risk of data breaches, ensuring users' information remains safe within the app environment.
              </Text>
            </View>
          </View>
        </View>
    },
    {
      title: 'Acknowledgments',
      content:
        <View style={{ width: '100%', padding: 20 }}>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >1.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Team Collaboration:</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                We acknowledge the dedicated efforts and collaboration of the entire development team, whose skills and creativity have brought Amigo to life.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >2.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Mentorship and Guidance :</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                We express our gratitude to our mentors and advisors for their valuable guidance and insights throughout the development process.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >3.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Support from Friends :</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                We sincerely thank our friends for their unwavering support and encouragement, which motivated us to persevere in our endeavor.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >4.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Community Feedback :</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                We appreciate the constructive feedback from the user community, which has been instrumental in refining Amigo to better serve its users.
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: "100%", marginVertical: 10 }}>
            <View style={{ width: '10%' }}>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >5.</Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, fontWeight: 700 }} >Technological Resources :</Text>
              <View style={{ height: 6 }} />
              <Text style={{ fontSize: 16 }}>
                We acknowledge the open-source community and various technological platforms that provided the essential tools and frameworks for building Amigo.
              </Text>
            </View>
          </View>
        </View>
    },
    {
      title: 'Developer Contacts',
      content:
        <View>



          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ width: '10%', marginTop: 5 }}>
              <Ionicons name="person" size={18} />
            </View>
            <View style={{ width: '90%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>
                  Bhanu Prasad
                </Text>
                <View style={{ backgroundColor: '#e60000', marginTop: 5, marginLeft: 'auto', paddingHorizontal: 8, borderRadius: 15 }}>
                  <Text style={{ color: "white", fontWeight: 800, fontSize: 13 }}>@Team Lead &  FullStack</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 500, fontSize: 15 }}>Email : </Text>
                <View >
                  <TouchableOpacity onPress={() => openComposer({ to: "bhanuprasadgoudanegouni@gmail.com" })}>
                    <Text selectable style={{ color: '#00ccff', fontSize: 15 }}>
                      bhanuprasadgoudanegouni@gmail.com
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>




          <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            <View style={{ width: '10%', marginTop: 5 }}>
              <Ionicons name="person" size={18} />
            </View>
            <View style={{ width: '90%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>
                  Srinath
                </Text>
                <View style={{ backgroundColor: '#e60000', marginTop: 5, marginLeft: 'auto', paddingHorizontal: 8, borderRadius: 15 }}>
                  <Text style={{ color: "white", fontWeight: 800, fontSize: 13 }}>@Frontend Development</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 500, fontSize: 15 }}>Email : </Text>
                <TouchableOpacity onPress={() => openComposer({ to: 'esnsrinath@gmail.com' })}>
                  <Text selectable style={{ color: '#00ccff', fontSize: 15, width: 250 }}>esnsrinath@gmail.com</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            <View style={{ width: '10%', marginTop: 5 }}>
              <Ionicons name="person" size={18} />
            </View>
            <View style={{ width: '90%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>
                  Harshitha
                </Text>
                <View style={{ backgroundColor: '#e60000', marginTop: 5, marginLeft: 'auto', paddingHorizontal: 8, borderRadius: 15 }}>
                  <Text style={{ color: "white", fontWeight: 800, fontSize: 13 }}>@Backend Development</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 500, fontSize: 15 }}>Email : </Text>
                <TouchableOpacity onPress={() => openComposer({ to: 'harshithabodhu09@gmail.com' })}>
                  <Text selectable style={{ color: '#00ccff', fontSize: 15, width: 250 }}>harshithabodhu09@gmail.com</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 20 }}>
            <View style={{ width: '10%', marginTop: 5 }}>
              <Ionicons name="person" size={18} />
            </View>
            <View style={{ width: '90%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>
                  Vinay Kumar
                </Text>
                <View style={{ backgroundColor: '#e60000', marginTop: 5, marginLeft: 'auto', paddingHorizontal: 8, borderRadius: 15 }}>
                  <Text style={{ color: "white", fontWeight: 800, fontSize: 13 }}>@Frontend Development</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 500, fontSize: 15 }}>Email : </Text>
                <TouchableOpacity onPress={() => openComposer({ to: 'vinaykumarmegadi@gmail.com' })}>
                  <Text selectable style={{ color: '#00ccff', fontSize: 15, width: 250 }}>vinaykumarmegadi@gmail.com</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    },
  ];

  // Email functionality
  const Email = async () => {
    const recipients = ['bhanuprasadgoudanegouni@gmail.com'];
    const sub = 'This is Message from Amigo User';
    const body = 'I am a user of Amigo, We loved your app so much...';
    await openComposer({
      to: recipients[0],
      subject: sub,
      body: body,
    });
  };

  // Handle Section Selection
  const handleSelect = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Dynamic Header */}
      <View style={styles.headerContainer}>
        {expandedSection === null ? (
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>About</Text>
            <TouchableOpacity onPress={Email} style={styles.contactButton}>
              <Text style={styles.contactText}>Contact Us</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => setExpandedSection(null)} style={styles.backButton}>
              <Ionicons name="chevron-back-outline" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{sections[expandedSection].title}</Text>
          </View>
        )}
      </View>

      {/* Content Display */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {expandedSection === null ? (
          sections.map((section, index) => (
            <View key={index} style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <TouchableOpacity onPress={() => handleSelect(index)}>
                <Ionicons name="chevron-forward-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.selectedSection}>
            <Text style={styles.sectionContent}>{sections[expandedSection].content}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Light background
    padding: 20,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  headerContainer: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: '500',
    color: '#000000',
    flex: 1,
  },
  contactButton: {
    backgroundColor: '#000000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  backButton: {
    paddingRight: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
  },
  selectedSection: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingHorizontal: 30,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 20,

  },
  sectionContent: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  scrollView: {
    paddingBottom: 50,
  },
});

export default About;
