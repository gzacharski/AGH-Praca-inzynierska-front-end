import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import modelReducer from "./model/reducer";
import stateReducer from "./state/reducer";

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

export default createStore(
  combineReducers({
    modelData: modelReducer,
    stateData: stateReducer,
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
);
