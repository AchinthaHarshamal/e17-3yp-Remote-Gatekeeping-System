import React from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";

import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";

const LoginScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>REMOTE GATEKEEPING SYSTEM</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/welcomeScreen.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.allInputFields}>
        <View style={styles.oneField}>
          <Text style={styles.label}>Name : </Text>
          <TextInput
            keyboardAppearance={"default"}
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.oneField}>
          <Text style={styles.label}>Email : </Text>
          <TextInput
            keyboardAppearance={"default"}
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.oneField}>
          <Text style={styles.label}>Password : </Text>
          <TextInput
            keyboardAppearance={"default"}
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.logInButton}>
          <CustomButton onPress={props.onPress}>Log In</CustomButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  titleContainer: {
    paddingVertical: 30,
    marginTop: "40%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#ffffff",
  },
  allInputFields: {
    flex: 0.7,
  },
  oneField: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: "10%",
    paddingVertical: 5,
    borderBottomColor: "#fff8dc",
    borderBottomWidth: 1,
    marginHorizontal: "10%",
    marginVertical: 10,
  },
  label: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
  },
  input: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 15,
  },
  logInButton: {
    alignItems: "center",
    marginTop: 30,
  },
});

export default LoginScreen;
