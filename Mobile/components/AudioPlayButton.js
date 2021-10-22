import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";

import CustomButton3 from "./CustomButton3";

const AudioPlayButton = (props) => {
  const [sound, setSound] = useState();

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: props.uri,
    });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <CustomButton3
      title="Play Sound"
      onPress={() => {
        playSound();
        props.onPress();
      }}
      styles={props.styles}
    >
      {props.children}
    </CustomButton3>
  );
};

export default AudioPlayButton;
