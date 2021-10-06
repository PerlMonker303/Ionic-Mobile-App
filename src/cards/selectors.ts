import { createSelector } from "reselect";
import { RootState } from "../store/reducers";

const getCardsState = (state: RootState) => state.cardsState;

export const getCards = createSelector(
  getCardsState,
  (cardsState) => cardsState.cards
);

export const isGettingCardsLoading = createSelector(
  getCardsState,
  (cardsState) => cardsState.loadingGettingCards
);

export const isGettingCardsError = createSelector(
  getCardsState,
  (cardsState) => cardsState.errorGettingCards
);
