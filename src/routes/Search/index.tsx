import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./styles.ts";
import { exitOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { ROUTE_LOGIN } from "..";
import React from "react";
import { getCurrentUser, getIsLoading } from "../../account/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../cards/selectors";
import CardType from "../../models/Card";
import Card from "../../cards/card";
import { fetchCardsAfterId, fetchCardsByTitle } from "../../cards/thunkActions";
import { useStyles } from "./styles";
import { clearCards } from "../../cards/actions";

type Props = {};

const Search: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const loggedUser = useSelector(getCurrentUser);
  const isLoading = useSelector(getIsLoading);
  const [searchText, setSearchText] = React.useState("");
  const cards: CardType[] = useSelector(getCards);
  const dispatch = useDispatch();

  const backButtonClicked = () => {
    dispatch(fetchCardsAfterId(-1, 3));
    history.goBack();
  };

  React.useEffect(() => {
    if (!loggedUser && !isLoading) {
      history.replace(ROUTE_LOGIN);
    }
  }, [loggedUser]);

  React.useEffect(() => {
    dispatch(fetchCardsByTitle(searchText));
  }, [searchText]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol size="1">
                <IonButton onClick={() => backButtonClicked()}>
                  <IonIcon icon={exitOutline}></IonIcon>
                </IonButton>
              </IonCol>
              <IonCol>
                <IonTitle>Search</IonTitle>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className={classes.content}>
        <IonText>Search by name: </IonText>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
          debounce={1000}
        ></IonSearchbar>

        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            stars={card.stars}
            addedOn={card.addedOn}
            rare={card.rare}
            image={card.image}
            postedBy={card.postedBy}
          />
        ))}
        {searchText === "" && (
          <IonText>Type something in the search bar</IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Search;
