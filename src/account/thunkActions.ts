import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { AccountState } from "./reducer";
import { signInFailure, signInStart, signInSuccess } from "./actions";
import { loginApi } from "../api/index";

export const signIn =
  (
    username: string,
    password: string
  ): ThunkAction<void, AccountState, unknown, Action<string>> =>
  async (dispatch) => {
    dispatch(signInStart());

    try {
      const user = await loginApi(username, password);
      if (String(user) === "Failed") {
        dispatch(signInFailure("Login failed"));
      }
      dispatch(signInSuccess(user));
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
