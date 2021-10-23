import React, { useState, useEffect } from "react";

import ActiveEventScreen from "../../screens/ActiveEventScreen";
import ActiveInteractiveScreen from "../../screens/ActiveInteractiveScreen";
import CloseActiveEventScreen from "../../screens/CloseActiveEventScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActiveEventNavigator = (props) => {
  const [activeInteractive, setActiveInteractive] = useState(false);
  const [closeEvent, setCloseEvent] = useState(false);
  const [mailBoxAccess, setMailBoxAccess] = useState(false);

  const [nodeId, setNodeId] = useState();

  const getNodeId = async () => {
    const userDetails = await AsyncStorage.getItem("userDetails");
    const transformedDetails = JSON.parse(userDetails);
    setNodeId(transformedDetails.nodeId);
  };

  useEffect(() => {
    getNodeId();
  }, []);

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
        nodeId={nodeId}
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
