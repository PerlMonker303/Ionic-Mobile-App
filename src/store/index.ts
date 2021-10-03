import { Middleware } from "redux";
import thunk from "redux-thunk";
import { persistentRootReducer } from "./reducers";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";

const middleWares: Middleware[] = [thunk];

const store = configureStore({
  reducer: persistentRootReducer,
  middleware: middleWares,
  devTools: true,
});

export const persistor = persistStore(store);

export default store;
