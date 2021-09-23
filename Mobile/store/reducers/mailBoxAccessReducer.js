import { MAIL_BOX_ACCESS } from "../actions/mailBoxAccessAction";

const initalState = {
  mailBoxAccess: false,
};

const mailBoxAccessReducer = (state = initalState, action) => {
  switch (action.type) {
    case MAIL_BOX_ACCESS:
      return {
        mailBoxAccess: action.access,
      };

    default:
      return state;
  }
};

export default mailBoxAccessReducer;
