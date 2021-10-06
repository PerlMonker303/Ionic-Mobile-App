import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./styles.ts";
import { exitOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import Input from "./Input";
import React from "react";
import { ROUTE_LOGIN } from "..";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../account/selectors";

type Props = {};

const NewCard: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const loggedUser = useSelector(getCurrentUser);

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
                <IonButton
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <IonIcon icon={exitOutline}></IonIcon>
                </IonButton>
              </IonCol>
              <IonCol>
                <IonTitle>Add a new Magic Card</IonTitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add a new Magic Card</IonTitle>
          </IonToolbar>
        </IonHeader>

        {loggedUser && <Input user={loggedUser} />}
      </IonContent>
    </IonPage>
  );
};

export default NewCard;
