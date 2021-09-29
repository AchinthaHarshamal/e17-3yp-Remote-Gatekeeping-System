import React, { useState } from "react";

import ActiveEventScreen from "../../screens/ActiveEventScreen";
import ActiveInteractiveScreen from "../../screens/ActiveInteractiveScreen";
import CloseActiveEventScreen from "../../screens/CloseActiveEventScreen";

const ActiveEventNavigator = (props) => {
  const [activeInteractive, setActiveInteractive] = useState(false);
  const [closeEvent, setCloseEvent] = useState(false);
  const [mailBoxAccess, setMailBoxAccess] = useState(false);

  const handleInteractive = () => {
    setActiveInteractive(true);
  };

  const handleCloseEvent = (mailBoxAccess) => {
    setActiveInteractive(false);
    setCloseEvent(true);
    setMailBoxAccess(mailBoxAccess);
  };

  const handleCloseEventBack = () => {
    setActiveInteractive(true);
    setCloseEvent(false);
  };

  if (activeInteractive) {
    return (
      <ActiveInteractiveScreen
        onPress={handleCloseEvent}
      ></ActiveInteractiveScreen>
    );
  }

  if (closeEvent) {
    return (
      <CloseActiveEventScreen
        onBack={handleCloseEventBack}
        onClose={props.onBack}
        mailBoxAccess={mailBoxAccess}
      ></CloseActiveEventScreen>
    );
  }

  return (
    <ActiveEventScreen
      onBack={props.onBack}
      onPress={handleInteractive}
    ></ActiveEventScreen>
  );
};

export default ActiveEventNavigator;
