import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

import CustomButton2 from "../components/CustomButton2";
import LogOutButton from "../components/LogOutButton";

const WelcomePage = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../assets/images/welcome_theme.jpg")}
          style={styles.image}
        >
          <View style={styles.dpImageContainer}>
            <Image
              source={require("../assets/images/dp.png")}
              style={styles.dpImage}
            />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Welcome User!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton2>Active Event</CustomButton2>
        <CustomButton2 onPress={props.clickPrev}>Previous Events</CustomButton2>
      </View>
      <View style={styles.LogOutButtonContainer}>
        <LogOutButton onPress={props.onPress}>Log Out</LogOutButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  imageContainer: {
    overflow: "hidden",
    width: "100%",
    height: "40%",
    borderBottomRightRadius: 150,
    borderBottomLeftRadius: 150,
    backgroundColor: "#1616B2",
  },
  image: {
    width: "100%",
    height: "100%",
    tintColor: "green",
    opacity: 1,
  },
  dpImageContainer: {
    height: 120,
    width: 120,
    marginTop: "40%",
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 60,
    alignItems: "center",
    marginLeft: 150,
    overflow: "hidden",
  },
  dpImage: {
    width: "100%",
    height: "100%",
    opacity: 1,
  },
  greetingContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  greeting: {
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    flex: 0.6,
    alignItems: "center",
  },
  LogOutButtonContainer: {
    alignItems: "flex-end",
    marginTop: 230,
    paddingRight: 20,
  },
});

export default WelcomePage;
