import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import { promiseMiddleware } from "./middleware";

export const store = createStore(
  rootReducer,
  applyMiddleware(promiseMiddleware, createLogger())
);
