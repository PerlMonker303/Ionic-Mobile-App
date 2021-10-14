import { createSelector } from "reselect";
import { RootState } from "../store/reducers";

export const getAppState = (state: RootState) => state.appState;

export const getIsOnline = createSelector(getAppState, (app) => app.isOnline);

export const getSocketConnection = createSelector(
  getAppState,
  (app) => app.socketConnection
);
