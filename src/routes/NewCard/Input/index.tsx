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
  createAnimation,
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
import CustomModal from "../../../app/customModal";

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
  const animationRef1 = React.useRef<HTMLDivElement>(null);
  const animationRef2 = React.useRef<HTMLDivElement>(null);
  const animationRef3 = React.useRef<HTMLDivElement>(null);
  const animationRef4 = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setAllFieldsCompleted(
      title.length > 0 &&
        description.length > 0 &&
        stars !== 0 &&
        uploadedPhoto !== ""
    );
  }, [title, description, stars, uploadedPhoto]);

  React.useEffect(() => {
    (async () => {
      await handlePlayAnimations();
    })();
  }, []);

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
      latitude: 0,
      longitude: 0,
    };
    dispatch(addCard(newCard, user));
    resetStates();
    history.push(ROUTE_HOME);
  };

  const resetStates = () => {
    setTitle("");
    setDescription("");
    setStars(0);
    setRare(false);
    setPostedBy("");
    setUploadedPhoto("");
    setAllFieldsCompleted(false);
  };

  const takePhoto = async () => {
    const photo = await takePhotoInBase64();
    if (photo) {
      setUploadedPhoto(photo);
    }
  };

  const handlePlayAnimations = async () => {
    // using chaining
    if (
      animationRef1.current &&
      animationRef2.current &&
      animationRef3.current &&
      animationRef4.current
    ) {
      const animation1 = createAnimation()
        .addElement(animationRef1.current)
        .duration(1000)
        .fromTo("transform", "scale(1.5)", "scale(1)");
      const animation2 = createAnimation()
        .addElement(animationRef2.current)
        .duration(1000)
        .fromTo("transform", "scale(1.5)", "scale(1)");
      const animation3 = createAnimation()
        .addElement(animationRef3.current)
        .duration(1000)
        .fromTo("transform", "scale(1.5)", "scale(1)");
      const animation4 = createAnimation()
        .addElement(animationRef4.current)
        .duration(1000)
        .fromTo("transform", "scale(1.5)", "scale(1)");

      await animation1.play();
      await animation2.play();
      await animation3.play();
      await animation4.play();
    }
  };

  return (
    <IonContent fullscreen>
      <IonList>
        <div className={classes.itemDividerLabel} ref={animationRef1}>
          Title
        </div>
        <IonItem className={classes.item}>
          <IonInput
            placeholder="ex: Phyrexian Rebirth"
            onIonChange={(e) => {
              setTitle(e.detail.value!);
            }}
            clearInput
          />
        </IonItem>

        <div className={classes.itemDividerLabel} ref={animationRef2}>
          Description
        </div>
        <IonItem className={classes.item}>
          <IonInput
            placeholder="ex: Destroy all creatures from your opponent's hand."
            onIonChange={(e) => {
              setDescription(e.detail.value!);
            }}
            clearInput
          />
        </IonItem>

        <div className={classes.itemDividerLabel} ref={animationRef3}>
          Stars (1-7)
        </div>
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
        <div className={classes.itemDividerLabel} ref={animationRef4}>
          Take a picture of the card
        </div>
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
      </IonList>
      <CustomModal
        disabled={!allFieldsCompleted}
        message={"Are you sure?"}
        buttonMessageClose={"Cancel"}
        buttonMessageOpen={"Add"}
        buttonMessageConfirm={"Confirm"}
        onConfirm={addClicked}
      />
    </IonContent>
  );
};

export default Input;
