import React from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonList,
  IonLoading,
  IonText,
  IonToast,
} from "@ionic/react";
import Card from "./card";
import CardType from "../models/Card";
import { useStyles } from "./styles";
import {
  getCards,
  isGettingCardsLoading,
  isGettingCardsError,
} from "./selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardsAfterId } from "./thunkActions";

const Cards: React.FC = () => {
  const cards: CardType[] = useSelector(getCards);
  const isLoading = useSelector(isGettingCardsLoading);
  const isError = useSelector(isGettingCardsError);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    React.useState<boolean>(false);
  const [finalCardId, setFinalCardId] = React.useState(-1);

  const getNextData = ($event: CustomEvent<void>) => {
    dispatch(fetchCardsAfterId(finalCardId, 3));
    ($event.target as HTMLIonInfiniteScrollElement).complete();
  };

  React.useEffect(() => {
    // take last card id
    if (cards.length > 0) {
      setFinalCardId(cards[cards.length - 1].id);
    }
  }, [cards]);

  return (
    <IonContent className={classes.content}>
      <IonLoading isOpen={isLoading} message={"Loading"} />
      {isError && <IonToast isOpen={isError !== undefined} message={isError} />}
      <IonList>
        {cards.length === 0 && <IonText>Nothing to show</IonText>}
        {cards.map((card) => (
          <IonItem key={card.id} button onClick={() => {}}>
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
              latitude={card.latitude}
              longitude={card.longitude}
              error={card.error}
            />
          </IonItem>
        ))}
      </IonList>
      <IonInfiniteScroll
        threshold="100px"
        disabled={disableInfiniteScroll}
        onIonInfinite={(e: CustomEvent<void>) => getNextData(e)}
      >
        <IonInfiniteScrollContent loadingText="Loading more good doggos..."></IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </IonContent>
  );
};

export default Cards;
