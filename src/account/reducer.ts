import { AccountAction } from "./actions";
import { ActionTypes } from "./actionTypes";
import { User } from "../models/User";

export type AccountState = {
  currentUser?: User;
  isLoading: boolean;
  error?: string;
  addedCard: boolean;
};

export const accountInitialState: AccountState = {
  currentUser: undefined,
  isLoading: false,
  error: undefined,
  addedCard: false,
};

const accountReducer = (
  state: AccountState = accountInitialState,
  action: AccountAction
) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case ActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.user,
        error: undefined,
      };
    case ActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.errorMessage,
      };
    case ActionTypes.SIGN_OUT:
      return {
        ...accountInitialState,
      };
    case ActionTypes.SET_ADDED_CARD:
      return {
        ...state,
        addedCard: action.value,
      };
    default:
      return state;
  }
};

export default accountReducer;
