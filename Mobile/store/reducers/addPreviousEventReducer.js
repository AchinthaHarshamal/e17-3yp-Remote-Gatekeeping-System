import { PreviousEventsList } from "../../dummy data/DummyData";
import {
  CLOSE_PREVIOUS_EVENT,
  GET_EVENT_DETAILS,
} from "../actions/addPreviousEventAction";

import Event from "../../Modal/Event";

const initalState = {
  previousEvents: PreviousEventsList,
};

const addPreviousEventReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_EVENT_DETAILS:
      return {
        previousEvents: action.events,
      };
    case CLOSE_PREVIOUS_EVENT:
      const addEvent = new Event(
        action.newEvent.id,
        action.newEvent.name,
        action.newEvent.date,
        action.newEvent.rating,
        action.newEvent.description,
        action.newEvent.mailBoxAccess,
        null
      );

      return { previousEvents: [addEvent, ...state.previousEvents] };

    default:
      return state;
  }
};

export default addPreviousEventReducer;
