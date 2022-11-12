import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Audio } from 'expo-av';

import Header from "../components/Header";
import CustomButton3 from "../components/CustomButton3";
import { ScrollView, State } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

import AudioPlayButton from "../components/AudioPlayButton";

import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage"; 

let key;

const ActiveInteractiveScreen = (props) => {
  const details = useSelector((state) => state.activeEvent.activeEventDetails);
  const [noneStatus, setNoneStatus] = useState(false); //message status is NONE
  const [listneningStatus, setListeningStatus] = useState(false); //message status is listing
  const [recordingStatus, setRecordingStatus] = useState(false); //message status is recording
  const [sendingStatus, setSendingStatus] = useState(false); //messeage status is sending
  const [mailBoxAccessRequest, setMailBoxAccessRequest] = useState(false); //message type is mailboxaccess
  const [mailBoxAccessResponse, setMailBoxAccessResponse] = useState(); //message status is access given
  const [closeEvent, setCloseEvent] = useState(false);      // for closing the event
  const [audioURL, setAudioURL] = useState(); //message url
  const [recording, setRecording] = useState(); //to store the recording file
  const [messageCount,setMessageCount] = useState(0); // to store the number of the audio
  const [eventCount,setEventCount] = useState(); // to store the event number

  const ref = firebase.database().ref(`messages/${props.nodeId}/`); //getting the firebase url

  const messageURL = "https://firebasestorage.googleapis.com/v0/b/gate-keeper-6fad9.appspot.com/o/";

  const date = new Date();

  const currDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;

  //setting a message listener
  const messageListener = async () => {
    await ref.on("value", (snapshot) => {
      //getting the messages related to the node
      const messages = snapshot.val();

      //getting the key of the last message(intercom message)
      key = Object.keys(messages).pop();

      //getting the last message itself
      const lastMsg = messages[key];

      // store the event counter
      setEventCount(lastMsg.event);      

      if (lastMsg.msgType == "AUDIO") {
        if (lastMsg.status == "NONE") {
          setNoneStatus(true);
          setListeningStatus(false);
          setRecordingStatus(false);
          setSendingStatus(false);
          setAudioURL(lastMsg.msgURL);
        } else if (lastMsg.status == "LISTENING") {
          setNoneStatus(false);
          setListeningStatus(true);
          setRecordingStatus(false);
          setSendingStatus(false);
        } else if (lastMsg.status == "RECORDING") {
          setNoneStatus(false);
          setListeningStatus(false);
          setRecordingStatus(true);
          setSendingStatus(false);
        } else if (lastMsg.status == "SENDING") {
          setNoneStatus(false);
          setListeningStatus(false);
          setRecordingStatus(false);
          setSendingStatus(true);
        }
      }
      if (lastMsg.msgType == "MAIL_BOX_ACCESS") {
        setMailBoxAccessRequest(true);
      }
      if (lastMsg.msgType == "CLOSED") {
        setCloseEvent(true);
      }
    });
  };

  // for updating the status of the message body in firebase
  const updateStatus = (status) => {
    const ref = firebase.database().ref(`messages/${props.nodeId}/` + key);
    ref.update({ status: status });
  };

  // for updating the url of the message body in firebase
  const updateMsgURL = (msgURL) => {
    const ref = firebase.database().ref(`messages/${props.nodeId}/` + key);
    ref.update({ msgURL: msgURL });
  };

  // for initial render
  useEffect(() => {
    messageListener();
  }, []);

  // for lisenting for message
  const listeningHandler = () => {
    if (!noneStatus) return;
    console.log("Listening to the voice");
    updateStatus("LISTENING");
  };

  // start recording
  async function startRecording() {
    try {

      // get permissions
      const permission = await Audio.requestPermissionsAsync();

      // check if user grants permissions
      if (permission.status === "granted") {
        
        // then start set audio recording settings
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        // start the recording
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        
        //update the recording
        setRecording(recording);

      } else {

        // if the user does not give permissions
        console.error("Please grant permission to app to access microphone");
      }
      // if there is any errors
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  // recording handler
  const recordingHandeler = () => {
    if (!listneningStatus) return;
    console.log("Recording your voice");
    updateStatus("RECORDING");

    //start recording
    startRecording();
  };

  // stop recording
  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
  }

  // send the record to the server
  const sendingHandler = async () => {
    if (!recordingStatus) return;

    // stop the recording
    await stopRecording();

    // print the state to the console
    console.log("Sending your voice");
    
    console.log("Recordings = ");
    console.log(recording);
    console.log(recording.getURI());
    console.log(recording);

    // get the uri
    const response = await fetch(recording.getURI());

    // create the file
    const file = await response.blob();

    // get a reference to the storage
    const storageRef = firebase.storage().ref();

    // upload the file to the storage
    await storageRef.child(`messages/${props.nodeId}/${currDate}E${eventCount}_${messageCount}.m4a`).put(file);

    // update the message url : comment for DEBUG
    updateMsgURL(`${messageURL}messages%2F${props.nodeId}%2F${currDate}E${eventCount}_${messageCount}.m4a?alt=media`);
    
    // update the count
    setMessageCount(messageCount+1);

    // update the status
    updateStatus("SENDING");

  };

  const mailBoxAccessHandler = () => {
    if (!mailBoxAccessRequest) return;
    console.log("Mail box is opened");
    updateStatus("ACCESS_GIVEN");
    setMailBoxAccessResponse(true);
  };

  const closeEventHandler = () => {
    if (!closeEvent) return;
    console.log("Event is closed by the user!");
    setCloseEvent(true);
  };

  const turnOffActiveListener = () => {
    ref.off("value", messageListener);
  };

  const handleOnClose = () => {
    props.onPress(mailBoxAccessResponse);
    turnOffActiveListener();
  };

  return (
    <View style={styles.screen}>
      <Header
        title={details.userType.toUpperCase()}
        onBack={props.onBack}
        noBack="Yes"
      ></Header>
      <ScrollView>
        <View style={styles.imageConatiner}>
          <Image
            source={{
              uri: details.msgURL,
            }}
            style={styles.image}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          {/* intercom Comminunication section */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Intercom Comminunication</Text>
            {noneStatus ? (
              <Text style={styles.voiceReceived} t>
                A voice has received!
              </Text>
            ) : (
              <View></View>
            )}
            {sendingStatus ? (
              <Text style={styles.voiceReceived} t>
                Waiting for the next voice...
              </Text>
            ) : (
              <View></View>
            )}
            <View style={styles.buttonContainer}>
              <AudioPlayButton
                activeOpacity={noneStatus ? 0.3 : 1}
                onPress={listeningHandler}
                styles={noneStatus ? styles.sendButton : styles.disable}
                uri={audioURL}
              >
                <AntDesign name="sound" size={24} color="black" />
              </AudioPlayButton>
              <CustomButton3
                activeOpacity={listneningStatus ? 0.5 : 1}
                onPress={recordingHandeler}
                styles={listneningStatus ? styles.sendButton : styles.disable}
              >
                <FontAwesome name="microphone" size={24} color="black" />
              </CustomButton3>
              <CustomButton3
                activeOpacity={recordingStatus ? 0.5 : 1}
                onPress={sendingHandler}
                styles={recordingStatus ? styles.sendButton : styles.disable}
              >
                <FontAwesome name="send" size={24} color="black" />
              </CustomButton3>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Mail Box Access</Text>
            {mailBoxAccessRequest && !mailBoxAccessResponse ? (
              <Text style={styles.voiceReceived}>
                Mail Box Access Requested!
              </Text>
            ) : (
              <View></View>
            )}
            {mailBoxAccessRequest && mailBoxAccessResponse ? (
              <Text style={styles.voiceReceived}>Mail Box Access Given!</Text>
            ) : (
              <View></View>
            )}
            <View style={styles.buttonContainer}>
              <CustomButton3
                activeOpacity={recordingStatus ? 0.5 : 1}
                onPress={mailBoxAccessHandler}
                styles={
                  mailBoxAccessRequest && !mailBoxAccessResponse
                    ? styles.sendButton
                    : styles.disable
                }
              >
                <MaterialCommunityIcons
                  name="mailbox-open"
                  size={24}
                  color="black"
                />
              </CustomButton3>
            </View>
          </View>

          <View style={styles.closeButtonContainer}>
            {closeEvent ? (
              <Text style={styles.voiceReceived}>
                Outsider has closed the event!
              </Text>
            ) : (
              <View></View>
            )}
            <CustomButton3 onPress={handleOnClose} styles={styles.close}>
              <AntDesign name="close" size={24} color="white" />
            </CustomButton3>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageConatiner: {
    height: 300,
    width: 300,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  fieldContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.cardColor,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  closeButtonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  loadingWheel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  noEvent: {
    fontSize: 20,
    color: "grey",
    textAlign: "center",
  },
  declineButton: {
    backgroundColor: "red",
  },
  acceptButton: {
    backgroundColor: "#30ba29",
  },
  sendButton: {
    backgroundColor: "#0ac90d",
    paddingHorizontal: 5,
    width: 40,
    paddingVertical: 5,
  },
  sendButtonContainer: {
    alignItems: "center",
  },
  disable: {
    backgroundColor: Colors.cardColor,
    paddingHorizontal: 5,
    width: 40,
    paddingVertical: 5,
  },
  voiceReceived: {
    fontSize: 18,
    color: "#8A8989",
    paddingTop: 5,
  },
  close: {
    backgroundColor: "red",
    paddingHorizontal: 5,
    width: 40,
    paddingVertical: 5,
  },
});

export default ActiveInteractiveScreen;
