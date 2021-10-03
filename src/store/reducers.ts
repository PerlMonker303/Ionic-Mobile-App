/* istanbul ignore file */

import accountReducer, {
  AccountState,
  accountInitialState,
} from "../account/reducer";
import cardsReducer from "../cards/reducer";
import { persistReducer } from "redux-persist";
import { cardsInitialState, CardsState } from "../cards/reducer";
import { combineReducers } from "redux";
import localforage from "localforage";

export type RootState = {
  accountState: AccountState;
  cardsState: CardsState;
};

export const initialRootState: RootState = {
  accountState: accountInitialState,
  cardsState: cardsInitialState,
};

const persistConfig = {
  key: "root",
  storage: localforage,
  whiteList: ["accountState"],
  blackList: ["cardState"],
};

const rootReducer = combineReducers({
  cardsState: cardsReducer,
  accountState: accountReducer,
});

export const persistentRootReducer = persistReducer(persistConfig, rootReducer);
