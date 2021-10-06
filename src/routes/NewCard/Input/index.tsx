import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonCheckbox,
  IonLabel,
  IonIcon,
  IonChip,
} from "@ionic/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addCard } from "../../../cards/thunkActions";
import Card from "../../../models/Card";
import { takePhotoInBase64 } from "../../../utils/imageHelper";
import { useStyles } from "./styles";
import { checkmarkCircleOutline } from "ionicons/icons";
import { CardMedia } from "@material-ui/core";
import { ROUTE_HOME } from "../..";
import { User } from "../../../models/User";

type Props = {
  user: User;
};

const Input: React.FC<Props> = (props: Props) => {
  const { user } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [allFieldsCompleted, setAllFieldsCompleted] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [stars, setStars] = React.useState(0);
  const [rare, setRare] = React.useState(false);
  const [postedBy, setPostedBy] = React.useState("");
  const [uploadedPhoto, setUploadedPhoto] = React.useState("");

  React.useEffect(() => {
    setAllFieldsCompleted(
      title.length > 0 &&
        description.length > 0 &&
        stars !== 0 &&
        uploadedPhoto !== ""
    );
  }, [title, description, stars, uploadedPhoto]);

  const addClicked = () => {
    const newCard: Card = {
      id: 0,
      title,
      description,
      stars: stars,
      rare,
      addedOn: Date(),
      image: uploadedPhoto,
      postedBy,
    };
    dispatch(addCard(newCard, user));
    history.push(ROUTE_HOME);
  };

  const takePhoto = async () => {
    const photo = await takePhotoInBase64();
    if (photo) {
      setUploadedPhoto(photo);
    }
  };

  return (
    <IonContent fullscreen>
      <IonList>
        <IonLabel className={classes.itemDividerLabel}>Title</IonLabel>
        <IonItem className={classes.item}>
          <IonInput
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
        <IonLabel className={classes.itemDividerLabel}>
          Take a picture of the card
        </IonLabel>
        {uploadedPhoto !== "" && (
          <IonItem className={classes.item}>
            <CardMedia
              className={classes.media}
              component="img"
              height="194"
              src={"data:image/png;base64," + uploadedPhoto}
            />
          </IonItem>
        )}
        <IonItem className={classes.item}>
          <IonButton onClick={takePhoto}>Photo</IonButton>
          {uploadedPhoto !== "" && (
            <IonChip>
              <IonIcon icon={checkmarkCircleOutline}></IonIcon>
              <IonLabel>Uploaded</IonLabel>
            </IonChip>
          )}
        </IonItem>
        <IonButton disabled={!allFieldsCompleted} onClick={addClicked}>
          Add
        </IonButton>
      </IonList>
    </IonContent>
  );
};

export default Input;
