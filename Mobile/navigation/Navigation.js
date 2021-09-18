import React, { useState } from "react";

import LoginScreen from "../screens/LoginScreen";
import WelcomePage from "../screens/WelcomePage";
import ActiveEventScreen from "../screens/ActiveEventScreen";
import CloseActiveEventScreen from "../screens/CloseActiveEventScreen";
import PreviousEvents from "../screens/PreviousEvents";
import PreviousEventDetails from "../screens/PreviousEventDetails";

const Navigation = (props) => {
  const [authorized, setAuthorized] = useState(false);
  const [prevEvents, setPrevEvents] = useState(false);
  const [preEventDetails, setPrevEventDetails] = useState(false);
  const [activeEvent, setActiveEvent] = useState(false);
  const [closeEvent, setCloseEvent] = useState(false);

  const [name, setName] = useState("");
  const [eventId, setEventId] = useState(false);

  const handleLogIn = (n) => {
    setName(n);
    console.log(n);
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
