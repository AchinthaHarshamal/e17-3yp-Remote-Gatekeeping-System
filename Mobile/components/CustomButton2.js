import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import Colors from "../constants/Colors";

const CustomButton2 = (props) => {
  return (
    <TouchableOpacity onPress={() => {}} activeOpacity={0.4}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 40,
    width: 200,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default CustomButton2;
