import { OPEN_NAVIGATION, CLOSE_NAVIGATION } from "./Actions";

export const openNavigation = () => ({
  type: OPEN_NAVIGATION,
});

export const closeNavigation = () => ({
  type: CLOSE_NAVIGATION,
});
