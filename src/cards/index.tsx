import {
  IonContent,
  IonItem,
  IonList,
  IonLoading,
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
import { useSelector } from "react-redux";

const Cards: React.FC = () => {
  const cards: CardType[] = useSelector(getCards);
  const isLoading = useSelector(isGettingCardsLoading);
  const isError = useSelector(isGettingCardsError);
  const classes = useStyles();

  return (
    <IonContent className={classes.content}>
      <IonLoading isOpen={isLoading} message={"Loading"} />
      {isError && <IonToast isOpen={isError !== undefined} message={isError} />}
      <IonList>
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
            />
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default Cards;
