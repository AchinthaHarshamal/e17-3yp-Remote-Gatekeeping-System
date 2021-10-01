import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const BackButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.4}>
      <View style={styles.button}>
        <AntDesign name="leftcircleo" size={24} color="black" />
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
    padding: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
});

export default BackButton;
