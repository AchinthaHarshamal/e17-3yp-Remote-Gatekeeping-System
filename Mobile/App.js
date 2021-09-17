import { StatusBar } from "expo-status-bar";
import { enableExpoCliLogging } from "expo/build/logs/Logs";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Navigation from "./navigation/Navigation";
import WelcomePage from "./screens/WelcomePage";
import LoginScreen from "./screens/LoginScreen";
import PreviousEvents from "./screens/PreviousEvents";
import PreviousEventDetails from "./screens/PreviousEventDetails";
import ActiveEventScreen from "./screens/ActiveEventScreen";
import CloseActiveEventScreen from "./screens/CloseActiveEventScreen";
import selectIdContext from "./contextAPI/selectId";
import { event, set } from "react-native-reanimated";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [prevEvents, setPrevEvents] = useState(false);
  const [preEventDetails, setPrevEventDetails] = useState(false);
  const [activeEvent, setActiveEvent] = useState(false);
  const [closeEvent, setCloseEvent] = useState(false);
  const [eventId, setEventId] = useState(false);

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
  const handlePreveEvent = () => {
    setPrevEvents(true);
    setAuthorized(false);
  };
  const handlePreveEventBack = () => {
    setPrevEvents(false);
    setAuthorized(true);
  };
  const handlePreveEventDetails = (id) => {
    setEventId(id);
    setPrevEvents(false);
    setPrevEventDetails(true);
  };
  const handlePreveEventDetailsBack = () => {
    setPrevEvents(true);
    setPrevEventDetails(false);
  };

  const handleActiveEvent = () => {
    setActiveEvent(true);
    setAuthorized(false);
  };

  const handleActiveEventBack = () => {
    setActiveEvent(false);
    setAuthorized(true);
  };

  const handleCloseEvent = () => {
    setCloseEvent(true);
    setActiveEvent(false);
  };

  const handleCloseEventBack = () => {
    setCloseEvent(false);
    setActiveEvent(true);
  };

  const handleClosing = () => {
    setCloseEvent(false);
    setAuthorized(true);
  };

  if (authorized) {
    return (
      <WelcomePage
        onPress={hangleLogOut}
        clickPrev={handlePreveEvent}
        clickActive={handleActiveEvent}
      ></WelcomePage>
    );
  }

  if (prevEvents) {
    return (
      <PreviousEvents
        onBack={handlePreveEventBack}
        onPress={handlePreveEventDetails}
      ></PreviousEvents>
    );
  }
  if (preEventDetails) {
    return (
      <PreviousEventDetails
        onBack={handlePreveEventDetailsBack}
        id={eventId}
      ></PreviousEventDetails>
    );
  }

  if (activeEvent) {
    return (
      <ActiveEventScreen
        onBack={handleActiveEventBack}
        onPress={handleCloseEvent}
      ></ActiveEventScreen>
    );
  }
  if (closeEvent) {
    return (
      <CloseActiveEventScreen
        onBack={handleCloseEventBack}
        onClose={handleClosing}
      ></CloseActiveEventScreen>
    );
  }

  return <LoginScreen onPress={handleLogIn}></LoginScreen>;
  // return <CloseActiveEventScreen></CloseActiveEventScreen>;
}
