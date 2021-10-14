import { applyMiddleware, createStore, Middleware } from "redux";
import thunk from "redux-thunk";
import { persistentReducer } from "./reducers";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWares: Middleware[] = [thunk];

// const store = configureStore({
//   reducer: combineReducers({
//     accountState: persistentAccountReducer,
//     cardsState: cardsReducer,
//     appState: appReducer,
//   }),
//   middleware: middleWares,
//   devTools: true,
// });
const middleware = applyMiddleware(thunk);
const store = createStore(persistentReducer, composeWithDevTools(middleware));

export const persistor = persistStore(store);

export default store;
