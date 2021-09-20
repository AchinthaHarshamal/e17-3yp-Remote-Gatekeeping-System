import { PreviousEventsList } from "../../dummy data/DummyData";
import { CLOSE_PREVIOUS_EVENT } from "../actions/addPreviousEventAction";

const initalState = {
  previousEvents: PreviousEventsList,
};

const addPreviousEventReducer = (state = initalState, action) => {
  switch (action.type) {
    case CLOSE_PREVIOUS_EVENT:
      return { previousEvents: [action.newEvent, ...state.previousEvents] };

    default:
      return state;
  }
};

export default addPreviousEventReducer;
