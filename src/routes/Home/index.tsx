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

type Props = {
  isOffline: boolean;
};

const Home: React.FC<Props> = ({ isOffline }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getCurrentUser);
  const addedCard = useSelector(getAddedCard);
  console.log(isOffline);

  const [isToastVisible, setIsToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [socketConnection, setSocketConnection] =
    React.useState<signalR.HubConnection>();

  const connectToWebSockets = async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/hub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection.on("NEW_CARD_ADDED", (res) => {
      if (loggedUser?.Id !== res) {
        setToastMessage("Somebody added a card.");
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

    history.push("/login");
  };

  React.useEffect(() => {
    if (!loggedUser) {
      history.replace("/login");
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Magic Cards</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonRow>
            <IonCol>
              <IonFabButton
                onClick={() => {
                  history.push("/new");
                }}
              >
                <IonIcon icon={addOutline}></IonIcon>
              </IonFabButton>
            </IonCol>
            <IonCol>
              <IonFabButton
                onClick={() => {
                  history.push("/location");
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
