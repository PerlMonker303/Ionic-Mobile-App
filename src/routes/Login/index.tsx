import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import "./styles.ts";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useStyles } from "./styles";
import { signIn } from "../../account/thunkActions";
import {
  getCurrentUser,
  getErrorMessage,
  getIsLoading,
} from "../../account/selectors";
import useToast from "../../hooks/useToast";
import { ROUTE_HOME, ROUTE_LOGIN } from "..";

type Props = {};

const Login: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getCurrentUser);
  const errorMessage = useSelector(getErrorMessage);
  const isUserLoading = useSelector(getIsLoading);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {
    message: toastMessage,
    setMessage: setToastMessage,
    isVisible: isToastVisible,
    setIsVisible: setIsToastVisible,
  } = useToast("");

  const login = () => {
    dispatch(signIn(username, password));
  };

  React.useEffect(() => {
    if (loggedUser && !isUserLoading) {
      history.push(ROUTE_HOME);
    }
  }, [isUserLoading]);

  React.useEffect(() => {
    if (errorMessage) {
      setToastMessage(errorMessage);
      setIsToastVisible(true);
    }
  }, [errorMessage]);

  React.useEffect(() => {
    if (!loggedUser) {
      history.replace(ROUTE_LOGIN);
    }
  }, [loggedUser]);

  return (
    <IonPage>
      <IonHeader className={classes.header}>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLabel className={classes.itemDividerLabel}>Username</IonLabel>
        <IonItem className={classes.item}>
          <IonInput
            placeholder="ex: Leroy_Jenkins"
            onIonChange={(e) => {
              setUsername(e.detail.value!);
            }}
          />
        </IonItem>

        <IonLabel className={classes.itemDividerLabel}>Password</IonLabel>
        <IonItem className={classes.item}>
          <IonInput
            type="password"
            onIonChange={(e) => {
              setPassword(e.detail.value!);
            }}
          />
        </IonItem>

        <IonButton onClick={login}>Log in</IonButton>

        <IonToast
          isOpen={isToastVisible}
          onDidDismiss={() => setIsToastVisible(false)}
          message={toastMessage}
          duration={5000}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
