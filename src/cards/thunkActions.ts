import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  addCardApi,
  getAllCardsApi,
  getCardsAfterIdApi,
  getCardsByStarsApi,
  getCardsByTitleApi,
  updateCardApi,
} from "../api";
import { RootState } from "../store/reducers";
import {
  addCardFailure,
  addCardStart,
  addCardSuccess,
  getCardsFailure,
  getCardsStart,
  getCardsSuccess,
  getCardsAfterIdStart,
  getCardsAfterIdSuccess,
  getCardsAfterIdFailure,
  updateCardFailure,
  updateCardStart,
  updateCardSuccess,
  getCardsByTitleStart,
  getCardsByTitleSuccess,
  getCardsByTitleFailure,
  clearCards,
  setFilterStars,
  getCardsByStarsStart,
  getCardsByStarsSuccess,
  getCardsByStarsFailure,
} from "./actions";
import Card from "../models/Card";
import { setAddedCard } from "../account/actions";
import { User } from "../models/User";
import { format } from "date-fns";

export const fetchCards =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function, getState) => {
    dispatch(getCardsStart());
    try {
      const state = getState();
      const cards: Card[] = await getAllCardsApi(
        state.accountState.currentUser?.Token!
      );

      dispatch(getCardsSuccess(cards));
    } catch (error) {
      dispatch(getCardsFailure(error as string));
    }
  };

export const fetchCardsAfterId =
  (
    afterId: number,
    count: number
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function, getState) => {
    dispatch(getCardsAfterIdStart());
    try {
      const state = getState();
      if (afterId === -1) {
        dispatch(clearCards());
      }
      const cards: Card[] = await getCardsAfterIdApi(
        afterId,
        count,
        state.cardsState.filterStars,
        state.accountState.currentUser?.Token!
      );
      dispatch(getCardsAfterIdSuccess(cards));
    } catch (error) {
      dispatch(getCardsAfterIdFailure(error as string));
    }
  };

export const fetchCardsByTitle =
  (name: string): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function, getState) => {
    dispatch(getCardsByTitleStart());
    try {
      const state = getState();
      const cards: Card[] = await getCardsByTitleApi(
        name,
        state.accountState.currentUser?.Token!
      );
      dispatch(getCardsByTitleSuccess(cards));
    } catch (error) {
      dispatch(getCardsByTitleFailure(error as string));
    }
  };

export const fetchCardsByStars =
  (stars: number): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function, getState) => {
    const state = getState();
    dispatch(setFilterStars(stars));
    dispatch(getCardsByStarsStart());
    try {
      const cards: Card[] = await getCardsByStarsApi(
        stars,
        state.accountState.currentUser?.Token!
      );
      dispatch(getCardsByStarsSuccess(cards));
    } catch (error) {
      dispatch(getCardsByStarsFailure(error as string));
    }
  };

export const addCard =
  (
    card: Card,
    user: User
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function, getState) => {
    dispatch(addCardStart());
    try {
      const state = getState();
      card.postedBy = user.Id.toString();
      card.addedOn = format(Date.parse(card.addedOn), "MM/dd/yyyy HH:mm:ss a");
      await addCardApi(card, state.accountState.currentUser?.Token!);

      if (!card.image.startsWith("data:image/png;base64,")) {
        card.image = "data:image/png;base64," + card.image;
      }
      card.postedBy = user.Username;

      dispatch(addCardSuccess(card));
      dispatch(setAddedCard(true));
    } catch (error) {
      dispatch(addCardFailure(error as string));
    }
  };

export const updateCard =
  (card: Card): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function, getState) => {
    dispatch(updateCardStart());
    try {
      const state = getState();
      await updateCardApi(card, state.accountState.currentUser?.Token!);

      if (!card.image.startsWith("data:image/png;base64,")) {
        card.image = "data:image/png;base64," + card.image;
      }

      dispatch(updateCardSuccess(card));
    } catch (error) {
      dispatch(updateCardFailure(error as string));
    }
  };
