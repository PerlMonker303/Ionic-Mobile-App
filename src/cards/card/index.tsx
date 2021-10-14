import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonItemGroup,
  IonText,
} from "@ionic/react";
import { CardMedia } from "@material-ui/core";
import { useHistory } from "react-router";
import CardType from "../../models/Card";
import { useStyles } from "./styles";

const Card: React.FC<CardType> = (props: CardType) => {
  const classes = useStyles();
  const history = useHistory();

  const editCard = (cardId: number) => {
    history.push("/edit/" + cardId);
  };

  return (
    <IonCard className={classes.card}>
      <IonCardHeader>
        <IonItemGroup className={classes.cardHeader}>
          <IonText className={classes.cardTitle}>{props.title}</IonText>
          <IonButton onClick={() => editCard(props.id)}>Edit</IonButton>
        </IonItemGroup>

        <IonCardSubtitle>Stars: {props.stars} / 7</IonCardSubtitle>
        <IonCardSubtitle>Posted by: {props.postedBy}</IonCardSubtitle>
        <IonCardSubtitle>Date posted: {props.addedOn}</IonCardSubtitle>
        <IonCardSubtitle>Is rare: {props.rare ? "yes" : "no"}</IonCardSubtitle>
        <IonCardContent>{props.description}</IonCardContent>
        <CardMedia
          className={classes.media}
          component="img"
          height="194"
          src={props.image}
        />
      </IonCardHeader>
    </IonCard>
  );
};

export default Card;
