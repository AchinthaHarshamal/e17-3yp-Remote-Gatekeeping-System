// import { PreviousEventsList } from "../../dummy data/DummyData";
// import {
//   CLOSE_PREVIOUS_EVENT,
//   GET_EVENT_DETAILS,
// } from "../actions/addPreviousEventAction";

import { CHECK_ACTIVE_EVENT } from "../../screens/ActiveEventScreen";

// import Event from "../../Modal/Event";

const initalState = {
  activeEventDetails: null,
};

const activeEventInitReducer = (state = initalState, action) => {
  switch (action.type) {
    case CHECK_ACTIVE_EVENT:
      return {
        activeEventDetails: action.activeEvent,
      };

    default:
      return state;
  }
};

export default activeEventInitReducer;
