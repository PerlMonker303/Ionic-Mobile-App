import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonCheckbox,
  IonLabel,
  IonPopover,
} from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { updateCard } from "../../../cards/thunkActions";
import Card from "../../../models/Card";
import { takePhotoInBase64 } from "../../../utils/imageHelper";
import { useStyles } from "./styles";
import { getCards } from "../../../cards/selectors";
import { isNumeric } from "../../../utils/common";
import { CardMedia } from "@material-ui/core";
import { ROUTE_HOME } from "../..";
import { getSocketConnection } from "../../../app/selectors";
import { getCurrentUser } from "../../../account/selectors";

const Input: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const cards: Card[] = useSelector(getCards);
  const socketConnection = useSelector(getSocketConnection);
  const loggedUser = useSelector(getCurrentUser);
  const params = useParams<{ id: string }>();
  const [id, setId] = React.useState(-1);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [stars, setStars] = React.useState(0);
  const [rare, setRare] = React.useState(false);
  const [postedBy, setPostedBy] = React.useState("");
  const [uploadedPhoto, setUploadedPhoto] = React.useState("");
  const [showPopover, setShowPopover] = React.useState(false);

  const renderPopover = () => (
    <IonContent>
      <IonLabel>Invalid id</IonLabel>
    </IonContent>
  );

  React.useEffect(() => {
    const cardId = params.id;
    if (!isNumeric(cardId)) {
      setShowPopover(true);
      return;
    }
    const card = cards.find((c) => c.id === parseInt(cardId));
    if (card) {
      setId(card.id);
      setTitle(card.title);
      setDescription(card.description);
      setStars(card.stars);
      setRare(card.rare);
      setPostedBy(card.postedBy);
      setUploadedPhoto(card.image);
    } else {
      setShowPopover(true);
    }
  }, []);

  const updateClicked = () => {
    const updatedCard: Card = {
      id,
      title,
      description,
      stars: stars,
      rare,
      addedOn: Date(),
      image: uploadedPhoto,
      postedBy,
    };
    dispatch(updateCard(updatedCard));
    console.log(postedBy);
    socketConnection &&
      socketConnection.invoke("CardModified", loggedUser!.Id, postedBy);
    history.replace(ROUTE_HOME);
  };

  const takePhoto = async () => {
    const photo = await takePhotoInBase64();
    if (photo) {
      setUploadedPhoto(photo);
    }
  };

  const getPhoto = () => {
    if (!uploadedPhoto.startsWith("data:image/png;base64,")) {
      return "data:image/png;base64," + uploadedPhoto;
    } else {
      return uploadedPhoto;
    }
  };

  return (
    <IonContent fullscreen>
      <IonList>
        <IonLabel className={classes.itemDividerLabel}>Title</IonLabel>
        <IonItem className={classes.item}>
          <IonInput
            value={title}
            placeholder="ex: Phyrexian Rebirth"
            onIonChange={(e) => {
              setTitle(e.detail.value!);
            }}
            clearInput
          />
        </IonItem>

        <IonLabel className={classes.itemDividerLabel}>Description</IonLabel>
        <IonItem className={classes.item}>
          <IonInput
            value={description}
            placeholder="ex: Destroy all creatures from your opponent's hand."
            onIonChange={(e) => {
              setDescription(e.detail.value!);
            }}
            clearInput
          />
        </IonItem>

        <IonLabel className={classes.itemDividerLabel}>Stars</IonLabel>
        <IonItem className={classes.item}>
          <IonInput
            value={stars}
            type="number"
            defaultValue="1"
            min="1"
            max="7"
            onIonChange={(e) => {
              if (+e.detail.value! > 7) {
                setStars(1);
              } else {
                setStars(parseInt(e.detail.value!));
              }
            }}
          />
        </IonItem>

        <IonItem className={classes.item}>
          <IonLabel>Is it rare? </IonLabel>
          <IonCheckbox checked={rare} onIonChange={(e) => setRare(!rare)} />
        </IonItem>

        <IonLabel className={classes.itemDividerLabel}>Card picture</IonLabel>
        <IonItem className={classes.item} lines="none">
          {uploadedPhoto !== "" && (
            <CardMedia
              className={classes.media}
              component="img"
              height="194"
              src={getPhoto()}
            />
          )}
        </IonItem>
        <IonItem className={classes.item}>
          <IonButton onClick={takePhoto}>Photo</IonButton>
        </IonItem>
        <IonButton onClick={updateClicked}>Update</IonButton>
      </IonList>

      <IonPopover
        cssClass="my-custom-class"
        isOpen={showPopover}
        onDidDismiss={() => history.replace(ROUTE_HOME)}
      >
        {renderPopover()}
      </IonPopover>
    </IonContent>
  );
};

export default Input;
