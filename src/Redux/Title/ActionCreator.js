import { SET_TITLE, RESET_TITLE } from "./Actions";

export const setTitle = (title) => {
  return {
    type: SET_TITLE,
    title,
  };
};

export const resetTitle = (title) => {
  return {
    type: RESET_TITLE,
  };
};
