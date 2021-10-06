import React from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItemGroup,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import Cards from "../../cards";
import "./styles.ts";
import { addOutline, locationOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../cards/thunkActions";
import { useStyles } from "./styles";
import { setAddedCard, signOut } from "../../account/actions";
import { getAddedCard, getCurrentUser } from "../../account/selectors";
import * as signalR from "@microsoft/signalr";
import { ROUTE_LOCATION, ROUTE_LOGIN, ROUTE_NEW } from "..";
import { WS_ENDPOINT } from "../../api";

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getCurrentUser);
  const addedCard = useSelector(getAddedCard);

  const [isToastVisible, setIsToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [socketConnection, setSocketConnection] =
    React.useState<signalR.HubConnection>();

  const connectToWebSockets = async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(WS_ENDPOINT, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection.on("NEW_CARD_ADDED", (res) => {
      if (loggedUser?.Id !== res) {
        setToastMessage("Somebody added a card. Reload the page to see it.");
        setIsToastVisible(true);
      }
    });

    try {
      await connection.start();
    } catch (err) {
      console.error(err);
    }

    setSocketConnection(connection);
  };

  React.useEffect(() => {
    dispatch(fetchCards());

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
      dispatch(fetchCards());
    }
  }, [loggedUser]);

  React.useEffect(() => {
    if (addedCard && socketConnection) {
      socketConnection.invoke("NewCardAdded", loggedUser?.Id);
    }
  }, [addedCard]);

  return (
    <IonPage>
      <IonHeader>
        <IonItemGroup className={classes.header}>
          <IonToolbar>
            <IonTitle>Magic Cards</IonTitle>
          </IonToolbar>
          <IonItemGroup className={classes.header_inner}>
            {loggedUser && <IonLabel>Hi, {loggedUser.Username}!</IonLabel>}

            <IonButton onClick={clickedLogout}>Log out</IonButton>
          </IonItemGroup>
        </IonItemGroup>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonRow>
            <IonCol>
              <IonFabButton
                onClick={() => {
                  history.push(ROUTE_NEW);
                }}
              >
                <IonIcon icon={addOutline}></IonIcon>
              </IonFabButton>
            </IonCol>
            <IonCol>
              <IonFabButton
                onClick={() => {
                  history.push(ROUTE_LOCATION);
                }}
              >
                <IonIcon icon={locationOutline}></IonIcon>
              </IonFabButton>
            </IonCol>
          </IonRow>
        </IonFab>
        <Cards />

        <IonToast
          isOpen={isToastVisible}
          onDidDismiss={() => setIsToastVisible(false)}
          message={toastMessage}
          duration={5000}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
