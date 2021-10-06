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
import {
  ROUTE_EDIT,
  ROUTE_HOME,
  ROUTE_LOCATION,
  ROUTE_LOGIN,
  ROUTE_NEW,
} from "./routes";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  const [networkState, setNetworkState] = React.useState("offline");

  React.useEffect(() => {
    window.addEventListener("online", () => {
      setNetworkState("online");
    });

    window.addEventListener("offline", () => {
      setNetworkState("offline");
    });
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
              <Route exact path={ROUTE_NEW} component={NewCard} />
              <Route exact path={ROUTE_EDIT} component={EditCard} />
              <Route exact path={ROUTE_HOME} component={Home} />
              <Route exact path={ROUTE_LOCATION} component={GeoLocation} />
              <Route exact path={ROUTE_LOGIN}>
                <Login />
              </Route>
              <Route component={Login} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </PersistGate>
    </Provider>
  );
};

export default App;
