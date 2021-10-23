import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Audio } from "expo-av";

import Header from "../components/Header";
import CustomButton3 from "../components/CustomButton3";
import { ScrollView, State } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { useSelector } from "react-redux";

import AudioPlayButton from "../components/AudioPlayButton";

import firebase from "firebase/app";
import "firebase/database";

let key;

const ActiveInteractiveScreen = (props) => {
  const details = useSelector((state) => state.activeEvent.activeEventDetails);
  const [noneStatus, setNoneStatus] = useState(false);
  const [listneningStatus, setListeningStatus] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState(false);
  const [sendingStatus, setSendingStatus] = useState(false);
  const [mailBoxAccessRequest, setMailBoxAccessRequest] = useState(false);
  const [mailBoxAccessResponse, setMailBoxAccessResponse] = useState();
  const [audioURL, setAudioURL] = useState();

  const ref = firebase.database().ref(`messages/${props.nodeId}/`);

  const messageListener = async () => {
    await ref.on("value", (snapshot) => {
      const messages = snapshot.val();
      key = Object.keys(messages).pop();
      const lastMsg = messages[key];
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
    });
  };

  const updateStatus = (status) => {
    const ref = firebase.database().ref(`messages/${props.nodeId}/` + key);
    ref.update({ status: status });
  };

  const updateMsgURL = (msgURL) => {
    const ref = firebase.database().ref(`messages/${props.nodeId}/` + key);
    ref.update({ msgURL: msgURL });
  };

  useEffect(() => {
    messageListener();
  }, []);

  const listeningHandler = () => {
    if (!noneStatus) return;
    console.log("Listening to the voice");
    updateStatus("LISTENING");
  };

  const recordingHandeler = () => {
    if (!listneningStatus) return;
    console.log("Recording your voice");
    updateStatus("RECORDING");
  };

  const sendingHandler = () => {
    if (!recordingStatus) return;
    console.log("Sending your voice");
    updateMsgURL(`messages/${props.nodeId}/2021-09-29E2N0.mp3`);
    updateStatus("SENDING");
  };

  const mailBoxAccessHandler = () => {
    if (!mailBoxAccessRequest) return;
    console.log("Mail box is opened");
    updateStatus("ACCESS_GIVEN");
    setMailBoxAccessResponse(true);
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
                Listen
              </AudioPlayButton>
              <CustomButton3
                activeOpacity={listneningStatus ? 0.5 : 1}
                onPress={recordingHandeler}
                styles={listneningStatus ? styles.sendButton : styles.disable}
              >
                Record Voice
              </CustomButton3>
            </View>
            <View style={styles.sendButtonContainer}>
              <CustomButton3
                activeOpacity={recordingStatus ? 0.5 : 1}
                onPress={sendingHandler}
                styles={recordingStatus ? styles.sendButton : styles.disable}
              >
                Send Voice
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
                Open
              </CustomButton3>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Close Event</Text>
            <View style={styles.buttonContainer}>
              <CustomButton3 onPress={handleOnClose}>Close</CustomButton3>
            </View>
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
  },
  sendButtonContainer: {
    alignItems: "center",
  },
  disable: {
    backgroundColor: "#C9CAD2",
  },
  voiceReceived: {
    fontSize: 18,
    color: "#8A8989",
    paddingTop: 5,
  },
});

export default ActiveInteractiveScreen;
