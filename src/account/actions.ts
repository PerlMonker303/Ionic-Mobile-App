import { ActionTypes } from "./actionTypes";
import { User } from "../models/User";

export type SignInStart = {
  type: ActionTypes.SIGN_IN_START;
};

export type SignInSuccess = {
  type: ActionTypes.SIGN_IN_SUCCESS;
  user: User;
};

export type SignInFailure = {
  type: ActionTypes.SIGN_IN_FAILURE;
  errorMessage: string | unknown;
};

export type SignOut = {
  type: ActionTypes.SIGN_OUT;
};

export type SetAddedCard = {
  type: ActionTypes.SET_ADDED_CARD;
  value: boolean;
};

export const signOut = (): SignOut => {
  return {
    type: ActionTypes.SIGN_OUT,
  };
};

export const signInStart = (): SignInStart => {
  return {
    type: ActionTypes.SIGN_IN_START,
  };
};

export const signInSuccess = (user: User): SignInSuccess => {
  return {
    type: ActionTypes.SIGN_IN_SUCCESS,
    user,
  };
};

export const signInFailure = (
  errorMessage: string | unknown
): SignInFailure => {
  return {
    type: ActionTypes.SIGN_IN_FAILURE,
    errorMessage,
  };
};

export const setAddedCard = (value: boolean): SetAddedCard => {
  return {
    type: ActionTypes.SET_ADDED_CARD,
    value,
  };
};

export type AccountAction =
  | SignInStart
  | SignInSuccess
  | SignInFailure
  | SignOut
  | SetAddedCard;
