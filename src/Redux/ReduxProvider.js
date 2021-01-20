import React from "react";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers } from "redux";

import navigationReducer from "Redux/Navigation/Reducers";
import titleReducer from "Redux/Title/Reducers";

const reducers = combineReducers({
  form: formReducer,
  navigation: navigationReducer,
  pageTitle: titleReducer,
});

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
