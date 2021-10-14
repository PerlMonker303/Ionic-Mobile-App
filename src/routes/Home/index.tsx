import React from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonPage,
  useIonToast,
} from "@ionic/react";
import Cards from "../../cards";
import "./styles.ts";
import { exitOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardsAfterId } from "../../cards/thunkActions";
import { useStyles } from "./styles";
import { setAddedCard, signOut } from "../../account/actions";
import { getAddedCard, getCurrentUser } from "../../account/selectors";
import * as signalR from "@microsoft/signalr";
import { ROUTE_LOGIN } from "..";
import { WS_ENDPOINT } from "../../api";
import { useNetwork } from "../../hooks/useNetwork";
import { setOffline, setOnline, setSocketConnection } from "../../app/actions";
import { getIsOnline, getSocketConnection } from "../../app/selectors";
import FilterPanel from "./FilterPanel";
import Buttons from "./Buttons";

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getCurrentUser);
  const addedCard = useSelector(getAddedCard);
  const isOnline = useSelector(getIsOnline);
  const socketConnection = useSelector(getSocketConnection);
  const { networkStatus } = useNetwork();
  const [presentToast, dismiss] = useIonToast();
  const [isFilterPanelOpen, setIsFilterPanelOpen] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState(-1);

  const connectToWebSockets = async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(WS_ENDPOINT, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection.on("NEW_CARD_ADDED", (res) => {
      if (loggedUser?.Id !== res) {
        presentToast({
          message: "Somebody added a card. Reload the page to see it.",
          position: "top",
          translucent: true,
          duration: 3000,
        });
      }
    });

    connection.on("CARD_MODIFIED", (idUser, username) => {
      if (loggedUser?.Username === username && loggedUser!.Id !== idUser) {
        presentToast({
          message:
            "Somebody modified a card you posted. Reload the page to see it.",
          position: "top",
          translucent: true,
          duration: 3000,
        });
      }
    });

    try {
      await connection.start();
    } catch (err) {
      console.error(err);
    }

    dispatch(setSocketConnection(connection));
  };

  React.useEffect(() => {
    // websockets
    connectToWebSockets();

    setTimeout(() => {
      dispatch(setAddedCard(false));
    }, 5000);
  }, []);

  const clickedLogout = () => {
    dispatch(signOut());

    history.push(ROUTE_LOGIN);
  };

  React.useEffect(() => {
    if (!loggedUser) {
      history.replace(ROUTE_LOGIN);
    } else {
      dispatch(fetchCardsAfterId(-1, 3));
    }
  }, [loggedUser]);

  React.useEffect(() => {
    if (addedCard && socketConnection) {
      socketConnection.invoke("NewCardAdded", loggedUser?.Id);
    }
  }, [addedCard]);

  React.useEffect(() => {
    console.log("Network status changed: ", networkStatus.connected);

    if (networkStatus.connected !== isOnline) {
      let msg = "";
      if (networkStatus.connected) {
        dispatch(setOnline());
        msg = "You are online!";
      } else {
        dispatch(setOffline());
        msg = "You are offline!";
      }
      presentToast({
        message: msg,
        position: "top",
        translucent: true,
        duration: 3000,
      });
    }
  }, [networkStatus]);

  React.useEffect(() => {
    // todo: dispatch to set selectedFilter
    // also fetch the data
  }, [selectedFilter]);

  return (
    <IonPage>
      <IonHeader>
        <IonItemGroup className={classes.header}>
          <IonItem className={classes.title}>Magic Cards</IonItem>
          <IonItemGroup className={classes.header_inner}>
            {loggedUser && <IonLabel>Hi, {loggedUser.Username}!</IonLabel>}

            <IonButton onClick={clickedLogout}>
              <IonIcon icon={exitOutline}></IonIcon>
            </IonButton>
          </IonItemGroup>
        </IonItemGroup>
      </IonHeader>
      <IonContent fullscreen>
        <Buttons
          isFilterPanelOpen={isFilterPanelOpen}
          setIsFilterPanelOpen={setIsFilterPanelOpen}
        />
        <Cards />
      </IonContent>
      {isFilterPanelOpen && (
        <FilterPanel
          setSelectedFilter={setSelectedFilter}
          closeFilterPanel={() => setIsFilterPanelOpen(false)}
        />
      )}
    </IonPage>
  );
};

export default Home;
