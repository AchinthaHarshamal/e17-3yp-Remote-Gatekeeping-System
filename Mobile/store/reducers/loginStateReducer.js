import { IS_LOGGED_IN } from "../actions/loginStateAction";

const initalState = {
  authorized: false,
};

const logginScreenReducer = (state = initalState, action) => {
  switch (action.type) {
    case IS_LOGGED_IN:
      return {
        authorized: action.authizied,
      };

    default:
      return state;
  }
};

export default logginScreenReducer;
