import React from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./routes/Home";
import NewCard from "./routes/NewCard";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { CircularProgress } from "@material-ui/core";
import EditCard from "./routes/EditCard";
import Login from "./routes/Login";
import GeoLocation from "./routes/GeoLocation";
// import { Network } from "@ionic-native/network";
import { Plugins } from "@capacitor/core";

const App: React.FC = () => {
  const [networkState, setNetworkState] = React.useState("offline");

  const { Network } = Plugins;

  React.useEffect(() => {
    window.addEventListener("online", () => {
      setNetworkState("online");
    });

    window.addEventListener("offline", () => {
      setNetworkState("offline");
    });
    // Network &&
    //   Network.addListener(
    //     "networkStatusChange",
    //     (status: { connectionType: React.SetStateAction<string> }) =>
    //       setNetworkState(status.connectionType)
    //   );
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={<CircularProgress color="secondary" />}
        persistor={persistor}
      >
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home isOffline={networkState === "offline"} />
              </Route>
              <Route exact path="/login">
                <Login isOffline={networkState === "offline"} />
              </Route>
              <Route exact path="/new">
                <NewCard isOffline={networkState === "offline"} />
              </Route>
              <Route path="/edit/:id">
                <EditCard isOffline={networkState === "offline"} />
              </Route>
              <Route path="/location">
                <GeoLocation isOffline={networkState === "offline"} />
              </Route>
              <Route component={Home} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </PersistGate>
    </Provider>
  );
};

export default App;
