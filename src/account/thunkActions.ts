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
      const resp = await loginApi(username, password);
      if (String(resp) === "FAILED") {
        dispatch(signInFailure("Login failed"));
        return;
      }
      dispatch(signInSuccess(resp));
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
