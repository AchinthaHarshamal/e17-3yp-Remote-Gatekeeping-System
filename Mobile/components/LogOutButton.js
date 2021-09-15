import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import Colors from "../constants/Colors";

const LogOutButton = (props) => {
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
    backgroundColor: Colors.primaryColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 40,
    width: 70,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default LogOutButton;
