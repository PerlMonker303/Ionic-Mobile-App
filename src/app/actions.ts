import { ActionTypes } from "./actionTypes";

export type SetOnline = {
  type: ActionTypes.SET_ONLINE;
};

export type SetOffline = {
  type: ActionTypes.SET_OFFLINE;
};

export type SetSocketConnection = {
  type: ActionTypes.SET_SOCKET_CONNECTION;
  value: signalR.HubConnection;
};

export const setOnline = (): SetOnline => {
  return {
    type: ActionTypes.SET_ONLINE,
  };
};

export const setOffline = (): SetOffline => {
  return {
    type: ActionTypes.SET_OFFLINE,
  };
};

export const setSocketConnection = (
  value: signalR.HubConnection
): SetSocketConnection => {
  return {
    type: ActionTypes.SET_SOCKET_CONNECTION,
    value,
  };
};

export type AppAction = SetOnline | SetOffline | SetSocketConnection;
