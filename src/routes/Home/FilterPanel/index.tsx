import { IonItem, IonList, IonListHeader } from "@ionic/react";
import "./styles.ts";
import React from "react";

export type Props = {
  setSelectedFilter: (value: number) => void;
  closeFilterPanel: () => void;
};

const FilterPanel: React.FC<Props> = (props: Props) => {
  const { setSelectedFilter, closeFilterPanel } = props;
  const renderButton = (idx: number) => {
    return (
      <IonItem
        key={idx}
        button
        onClick={() => {
          setSelectedFilter(idx);
          closeFilterPanel();
        }}
      >
        {idx === -1 ? "Reset" : idx}
      </IonItem>
    );
  };

  return (
    <IonList>
      <IonListHeader>Filter by number of stars</IonListHeader>
      {[-1, 1, 2, 3, 4, 5, 6, 7].map((idx) => renderButton(idx))}
    </IonList>
  );
};

export default FilterPanel;
