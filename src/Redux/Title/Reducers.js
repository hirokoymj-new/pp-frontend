import { combineReducers } from "redux";

import { SET_TITLE, RESET_TITLE } from "./Actions";

const title = (state = "", action) => {
  switch (action.type) {
    case SET_TITLE: {
      const { title } = action;
      return title;
    }
    case RESET_TITLE:
      return "";
    default:
      return state;
  }
};

export default combineReducers({
  title,
});
