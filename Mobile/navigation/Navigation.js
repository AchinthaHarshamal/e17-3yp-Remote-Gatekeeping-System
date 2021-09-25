import React, { useState } from "react";

import LoginScreen from "../screens/LoginScreen";
import WelcomePage from "../screens/WelcomePage";
import ActiveEventNavigator from "./ActiveEventStackNavigator/ActiveEventNavigator";
import PreviousEventStackNavigator from "./PreviousEventStackNavigator/PreviousEventStackNavigator";

const Navigation = (props) => {
  const [welcomeScreen, setWelcomeScreen] = useState(false);
  const [ActiveEventNav, setActiveEventNav] = useState(false);
  const [PreviousEventStackNav, setPreviousEventStackNav] = useState(false);

  const [name, setName] = useState("");

  const handleLogIn = (n) => {
    setName(n);
    setWelcomeScreen(true);
  };
  const hangleLogOut = () => {
    setWelcomeScreen(false);
  };

  const handleActiveEvent = () => {
    setActiveEventNav(true);
    setWelcomeScreen(false);
  };

  const handleActiveEventBack = () => {
    setActiveEventNav(false);
    setWelcomeScreen(true);
  };

  const handlePreveEvent = () => {
    setPreviousEventStackNav(true);
    setWelcomeScreen(false);
  };

  const handlePreveEventBack = () => {
    setPreviousEventStackNav(false);
    setWelcomeScreen(true);
  };

  if (welcomeScreen) {
    return (
      <WelcomePage
        onPress={hangleLogOut}
        clickPrev={handlePreveEvent}
        clickActive={handleActiveEvent}
        name={name}
      ></WelcomePage>
    );
  }

  if (ActiveEventNav) {
    return (
      <ActiveEventNavigator
        onBack={handleActiveEventBack}
      ></ActiveEventNavigator>
    );
  }

  if (PreviousEventStackNav) {
    return (
      <PreviousEventStackNavigator
        onBack={handlePreveEventBack}
      ></PreviousEventStackNavigator>
    );
  }

  return <LoginScreen onPress={handleLogIn}></LoginScreen>;
};

export default Navigation;
