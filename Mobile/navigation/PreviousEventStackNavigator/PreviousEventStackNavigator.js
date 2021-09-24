import React, { useState } from "react";

import PreviousEvents from "../../screens/PreviousEvents";
import PreviousEventDetails from "../../screens/PreviousEventDetails";

const PreviousEventStackNavigator = (props) => {
  const [preEventDetails, setPrevEventDetails] = useState(false);
  const [eventId, setEventId] = useState(false);

  const handlePreveEventDetails = (id) => {
    setEventId(id);
    setPrevEventDetails(true);
  };

  const handlePreveEventDetailsBack = () => {
    setPrevEventDetails(false);
  };

  if (preEventDetails) {
    return (
      <PreviousEventDetails
        onBack={handlePreveEventDetailsBack}
        id={eventId}
      ></PreviousEventDetails>
    );
  }

  return (
    <PreviousEvents
      onBack={props.onBack}
      onPress={handlePreveEventDetails}
    ></PreviousEvents>
  );
};

export default PreviousEventStackNavigator;
