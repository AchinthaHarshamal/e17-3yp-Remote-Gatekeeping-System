import React, { useState } from "react";

import ActiveEventScreen from "../../screens/ActiveEventScreen";
import CloseActiveEventScreen from "../../screens/CloseActiveEventScreen";

const ActiveEventNavigator = (props) => {
  const [closeEvent, setCloseEvent] = useState(false);

  const handleCloseEvent = () => {
    setCloseEvent(true);
  };

  const handleCloseEventBack = () => {
    setCloseEvent(false);
  };

  if (closeEvent) {
    return (
      <CloseActiveEventScreen
        onBack={handleCloseEventBack}
        onClose={props.onBack}
      ></CloseActiveEventScreen>
    );
  }

  return (
    <ActiveEventScreen
      onBack={props.onBack}
      onPress={handleCloseEvent}
    ></ActiveEventScreen>
  );
};

export default ActiveEventNavigator;
