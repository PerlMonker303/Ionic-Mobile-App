/* istanbul ignore file */

import accountReducer, {
  AccountState,
  accountInitialState,
} from "../account/reducer";
import { persistCombineReducers } from "redux-persist";
import cardsReducer, { cardsInitialState, CardsState } from "../cards/reducer";
import storage from "redux-persist/lib/storage";
import appReducer, { appInitialState, AppState } from "../app/reducer";

export type RootState = {
  accountState: AccountState;
  cardsState: CardsState;
  appState: AppState;
};

export const initialRootState: RootState = {
  accountState: accountInitialState,
  cardsState: cardsInitialState,
  appState: appInitialState,
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["accountState"], // persists the account state
  blacklist: ["cardsState", "appState"],
};

export const persistentReducer = persistCombineReducers(persistConfig, {
  appState: appReducer,
  accountState: accountReducer,
  cardsState: cardsReducer,
});
