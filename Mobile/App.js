import { StatusBar } from "expo-status-bar";
import { enableExpoCliLogging } from "expo/build/logs/Logs";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Navigation from "./navigation/Navigation";
import WelcomePage from "./screens/WelcomePage";
import LoginScreen from "./screens/LoginScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const handleLogIn = () => {
    setAuthorized(true);
  };

  const hangleLogOut = () => {
    setAuthorized(false);
  };

  if (authorized) {
    return <WelcomePage onPress={hangleLogOut}></WelcomePage>;
  }

  return <LoginScreen onPress={handleLogIn}></LoginScreen>;
}
