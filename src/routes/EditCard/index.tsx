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
import { ROUTE_LOGIN } from "..";
import React from "react";
import { getCurrentUser, getIsLoading } from "../../account/selectors";
import { useSelector } from "react-redux";

type Props = {};

const NewCard: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const loggedUser = useSelector(getCurrentUser);
  const isLoading = useSelector(getIsLoading);

  React.useEffect(() => {
    if (!loggedUser && !isLoading) {
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
                <IonTitle>Edit a Magic Card</IonTitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Input />
      </IonContent>
    </IonPage>
  );
};

export default NewCard;
