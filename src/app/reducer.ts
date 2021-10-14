import { AppAction } from "./actions";
import { ActionTypes } from "./actionTypes";

export type AppState = {
  isOnline: boolean;
  socketConnection: signalR.HubConnection | undefined;
};

export const appInitialState: AppState = {
  isOnline: false,
  socketConnection: undefined,
};

const appReducer = (state: AppState = appInitialState, action: AppAction) => {
  switch (action.type) {
    case ActionTypes.SET_ONLINE:
      return {
        ...state,
        isOnline: true,
      };
    case ActionTypes.SET_OFFLINE:
      return {
        ...state,
        isOnline: false,
      };
    case ActionTypes.SET_SOCKET_CONNECTION:
      return {
        ...state,
        socketConnection: action.value,
      };
    default:
      return state;
  }
};

export default appReducer;
