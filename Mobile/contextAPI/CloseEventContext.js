import React from "react";

const CloseEventContext = React.createContext({
  isMailBoxAccessed: false,
  eventName: "Ish",
  eventDescription: "",
  rating: 0,
});

export default CloseEventContext;
