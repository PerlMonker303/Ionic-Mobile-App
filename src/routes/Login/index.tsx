import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./styles.ts";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { useStyles } from "./styles";
import { signIn } from "../../account/thunkActions";
import { getCurrentUser } from "../../account/selectors";

type Props = {
  isOffline: boolean;
};

const Login: React.FC<Props> = ({ isOffline }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedUser = useSelector(getCurrentUser);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    dispatch(signIn(username, password));
  };

  React.useEffect(() => {
    if (loggedUser) {
      history.replace("/home");
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
