import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const BackButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.4}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    borderRadius: 25,
    width: 40,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
});

export default BackButton;
