import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

import * as autActions from "../store/actions/authAction";
import Colors from "../constants/Colors";

import { useDispatch } from "react-redux";

const LogOutButton = (props) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(autActions.logout());
    props.onPress();
  };

  return (
    <TouchableOpacity onPress={handleLogOut} activeOpacity={0.4}>
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
