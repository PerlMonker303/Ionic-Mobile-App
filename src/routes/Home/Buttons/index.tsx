import { IonCol, IonFab, IonFabButton, IonIcon, IonRow } from "@ionic/react";
import "./styles.ts";
import {
  addOutline,
  closeOutline,
  locationOutline,
  searchOutline,
  starOutline,
} from "ionicons/icons";
import { useHistory } from "react-router";
import React from "react";
import { ROUTE_LOCATION, ROUTE_NEW, ROUTE_SEARCH } from "../..";

type Props = {
  isFilterPanelOpen: boolean;
  setIsFilterPanelOpen: (value: boolean) => void;
};

const Buttons: React.FC<Props> = (props: Props) => {
  const { isFilterPanelOpen, setIsFilterPanelOpen } = props;
  const history = useHistory();

  return (
    <IonFab vertical="bottom" horizontal="center" slot="fixed">
      <IonRow>
        <IonCol>
          <IonFabButton onClick={() => history.push(ROUTE_NEW)}>
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonCol>
        <IonCol>
          <IonFabButton onClick={() => history.push(ROUTE_LOCATION)}>
            <IonIcon icon={locationOutline}></IonIcon>
          </IonFabButton>
        </IonCol>
        <IonCol>
          <IonFabButton onClick={() => history.push(ROUTE_SEARCH)}>
            <IonIcon icon={searchOutline}></IonIcon>
          </IonFabButton>
        </IonCol>
        <IonCol>
          <IonFabButton
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          >
            <IonIcon
              icon={isFilterPanelOpen ? closeOutline : starOutline}
            ></IonIcon>
          </IonFabButton>
        </IonCol>
      </IonRow>
    </IonFab>
  );
};

export default Buttons;
