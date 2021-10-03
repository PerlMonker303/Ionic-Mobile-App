import { IonContent, IonItem, IonList } from "@ionic/react";
import Card from "./card";
import CardType from "../models/Card";
import { useStyles } from "./styles";
import { getCards } from "./selectors";
import { useSelector } from "react-redux";

const Cards: React.FC = () => {
  const cards: CardType[] = useSelector(getCards);
  const classes = useStyles();

  return (
    <IonContent className={classes.content}>
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
            />
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default Cards;
