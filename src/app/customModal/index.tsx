import React from "react";
import {
  createAnimation,
  IonModal,
  IonButton,
  IonItemGroup,
  IonContent,
} from "@ionic/react";
import { useStyles } from "./styles";

type Props = {
  disabled: boolean;
  message: string;
  buttonMessageOpen: string;
  buttonMessageClose: string;
  buttonMessageConfirm: string;
  onConfirm: () => void;
};

const CustomModal: React.FC<Props> = (props: Props) => {
  const {
    disabled,
    message,
    buttonMessageOpen,
    buttonMessageClose,
    buttonMessageConfirm,
    onConfirm,
  } = props;
  const classes = useStyles();
  const [showModal, setShowModal] = React.useState(false);

  const enterAnimation = (baseEl: any) => {
    const backdropAnimation = createAnimation()
      .addElement(baseEl.querySelector("ion-backdrop")!)
      .fromTo("opacity", "0.01", "var(--backdrop-opacity)");

    const wrapperAnimation = createAnimation()
      .addElement(baseEl.querySelector(".modal-wrapper")!)
      .keyframes([
        { offset: 0, opacity: "0", transform: "scale(0)" },
        { offset: 1, opacity: "0.99", transform: "scale(1)" },
      ]);

    return createAnimation()
      .addElement(baseEl)
      .easing("ease-out")
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  const leaveAnimation = (baseEl: any) => {
    return enterAnimation(baseEl).direction("reverse");
  };

  return (
    <>
      <IonModal
        isOpen={showModal}
        enterAnimation={enterAnimation}
        leaveAnimation={leaveAnimation}
      >
        <IonContent>
          <p>{message}</p>
          <IonItemGroup>
            <IonButton onClick={() => setShowModal(false)}>
              {buttonMessageClose}
            </IonButton>
            <IonButton
              onClick={() => {
                onConfirm();
                setShowModal(false);
              }}
            >
              {buttonMessageConfirm}
            </IonButton>
          </IonItemGroup>
        </IonContent>
      </IonModal>
      <IonButton disabled={disabled} onClick={() => setShowModal(true)}>
        {buttonMessageOpen}
      </IonButton>
    </>
  );
};

export default CustomModal;
