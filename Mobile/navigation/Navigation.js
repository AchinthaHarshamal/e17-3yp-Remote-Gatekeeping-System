import React, { useState } from "react";

import LoginScreen from "../screens/LoginScreen";
import WelcomePage from "../screens/WelcomePage";
import ActiveEventScreen from "../screens/ActiveEventScreen";
import CloseActiveEventScreen from "../screens/CloseActiveEventScreen";
import PreviousEvents from "../screens/PreviousEvents";
import PreviousEventDetails from "../screens/PreviousEventDetails";

import { useSelector } from "react-redux";

const Navigation = (props) => {
  const [welcomeScreen, setWelcomeScreen] = useState(false);
  const [prevEvents, setPrevEvents] = useState(false);
  const [preEventDetails, setPrevEventDetails] = useState(false);
  const [activeEvent, setActiveEvent] = useState(false);
  const [closeEvent, setCloseEvent] = useState(false);

  const [name, setName] = useState("");
  const [eventId, setEventId] = useState(false);

  const authorization = useSelector((state) => state.loginState.authorized);
  console.log(authorization);

  const handleLogIn = (n) => {
    setName(n);
    if (authorization) {
      setWelcomeScreen(true);
    }
  };
  const hangleLogOut = () => {
    setWelcomeScreen(false);
  };
  const handlePreveEvent = () => {
    setPrevEvents(true);
    setWelcomeScreen(false);
  };
  const handlePreveEventBack = () => {
    setPrevEvents(false);
    setWelcomeScreen(true);
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
    setWelcomeScreen(false);
  };

  const handleActiveEventBack = () => {
    setActiveEvent(false);
    setWelcomeScreen(true);
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
};

export default Navigation;
