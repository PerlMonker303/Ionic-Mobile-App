import React from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./styles.ts";
import { exitOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { Geolocation, Geoposition } from "ionic-native";
import CustomMap from "./CustomMap";
import { ROUTE_LOGIN } from "..";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../account/selectors";
import { useLocation } from "react-router-dom";
import Card from "../../models/Card";
import { getCardByIdApi } from "../../api";
import { updateCard } from "../../cards/thunkActions";
import { getSocketConnection } from "../../app/selectors";

type Props = {};

const GeoLocation: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const search = useLocation().search;
  const cardId = new URLSearchParams(search).get("id");
  const loggedUser = useSelector(getCurrentUser);
  const socketConnection = useSelector(getSocketConnection);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<Geoposition>();
  const [clickedMap, setClickedMap] = React.useState(false);
  const [clickedLocation, setClickedLocation] =
    React.useState<{ lat: number; lng: number }>();
  const [currentCard, setCurrentCard] = React.useState<Card>();

  const getLocation = async () => {
    setLoading(true);
    try {
      const pos = await Geolocation.getCurrentPosition();
      setLoading(false);
      setPosition(pos);
    } catch (e) {}
  };

  React.useEffect(() => {
    if (!loggedUser) {
      history.replace(ROUTE_LOGIN);
    }

    if (cardId) {
      (async () => {
        const card: Card = await getCardByIdApi(cardId, loggedUser?.Token!);
        setCurrentCard(card);
        let posCopy = await Geolocation.getCurrentPosition();
        const gp: Geoposition = {
          ...posCopy,
          coords: {
            ...posCopy.coords,
            latitude: card.latitude,
            longitude: card.longitude,
          },
        };
        setPosition(gp);
      })();
    }
  }, [loggedUser]);

  const updateClicked = () => {
    if (!clickedLocation) {
      return;
    }
    if (!currentCard) {
      return;
    }
    console.log(clickedLocation);
    const updatedCard: Card = {
      ...currentCard,
      latitude: clickedLocation.lat,
      longitude: clickedLocation.lng,
    };
    dispatch(updateCard(updatedCard));
    socketConnection &&
      socketConnection.invoke(
        "CardModified",
        loggedUser!.Id,
        loggedUser?.Username
      );
    history.go(0);
  };

  React.useEffect(() => {
    console.log(clickedLocation);
  }, [clickedLocation]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="1">
                <IonButton onClick={() => history.goBack()}>
                  <IonIcon icon={exitOutline}></IonIcon>
                </IonButton>
              </IonCol>
              <IonCol>
                <IonTitle>Your current location</IonTitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading
          isOpen={loading}
          message={"Getting Location ..."}
          onDidDismiss={() => setLoading(false)}
        />
        <IonButton onClick={getLocation}>
          {position
            ? `${position.coords.latitude} ${position.coords.longitude}`
            : "Get location"}
        </IonButton>

        {position && (
          <CustomMap
            position={position}
            setClickedMap={setClickedMap}
            setClickedLocation={setClickedLocation}
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        )}
        <IonButton onClick={updateClicked} disabled={!clickedMap}>
          Update
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default GeoLocation;
