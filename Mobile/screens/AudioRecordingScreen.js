import * as React from "react";
import { Text, View, StyleSheet, Button, Platform } from "react-native";
import { Audio } from "expo-av";

import "firebase/storage";

import CustomButton3 from "../components/CustomButton3";
import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";

const AudioRecordingScreen = (props) => {
  const [recording, setRecording] = React.useState();

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log(Image.resolveAssetSource(exampleImage).uri);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", decodeURI(uri.substring(7)));
  }

  async function normalizePath(path) {
    const filePrefix = "file://";
    if (path.startsWith(filePrefix)) {
      path = path.substring(filePrefix.length);
    }

    // try {
    //   path = decodeURI(path);
    // } catch (e) {}

    return path;
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <CustomButton3 onPress={() => {}}> Send </CustomButton3>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});

export default AudioRecordingScreen;
