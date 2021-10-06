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
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../account/selectors";

type Props = {};

const GeoLocation: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const loggedUser = useSelector(getCurrentUser);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<Geoposition>();

  const getLocation = async () => {
    setLoading(true);
    try {
      const position = await Geolocation.getCurrentPosition();
      setLoading(false);
      setPosition(position);
    } catch (e) {}
  };

  React.useEffect(() => {
    if (!loggedUser) {
      history.replace(ROUTE_LOGIN);
    }
  }, [loggedUser]);

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

        {position && <CustomMap location={position} />}
      </IonContent>
    </IonPage>
  );
};

export default GeoLocation;
