import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const CustomButton = (props) => {
  return (
    <View style={styles.buttonSection}>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.label}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSection: {
    flex: 0.6,
    marginTop: 25,
    marginHorizontal: "30%",
    elevation: 30,
  },
  button: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    alignItems: "center",
    textAlignVertical: "center",
  },
  label: {
    color: "#8A8989",
    fontSize: 15,
    marginTop: 6,
  },
});

export default CustomButton;
