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

type Props = {
  isOffline: boolean;
};

const NewCard: React.FC<Props> = ({ isOffline }: Props) => {
  const history = useHistory();

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

        <Input />
      </IonContent>
    </IonPage>
  );
};

export default NewCard;
