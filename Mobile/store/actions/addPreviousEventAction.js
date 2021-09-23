export const CLOSE_PREVIOUS_EVENT = "CLOSE_PREVIOUS_EVENT";

export const addNewPrevEvent = (eventDetails) => {
  return {
    type: CLOSE_PREVIOUS_EVENT,
    newEvent: eventDetails,
  };
};
