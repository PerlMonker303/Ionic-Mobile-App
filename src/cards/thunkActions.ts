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
  clearFailedTransactions,
} from "./actions";
import Card from "../models/Card";
import { setAddedCard } from "../account/actions";
import { User } from "../models/User";
import { format } from "date-fns";
import Transaction from "../models/Transaction";
import { createTransaction } from "../utils/createTransaction";

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
    user: User,
    retry?: Boolean
  ): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function, getState) => {
    const state = getState();
    dispatch(addCardStart());
    try {
      if (!retry) {
        card.postedBy = user.Id.toString();
        card.addedOn = format(
          Date.parse(card.addedOn),
          "MM/dd/yyyy HH:mm:ss a"
        );
      }
      await addCardApi(card, state.accountState.currentUser?.Token!);

      if (!card.image.startsWith("data:image/png;base64,")) {
        card.image = "data:image/png;base64," + card.image;
      }
      card.postedBy = user.Username;

      dispatch(addCardSuccess(card));
      dispatch(setAddedCard(true));
    } catch (error) {
      const failedTransaction: Transaction = createTransaction(
        "addCard",
        JSON.stringify({ card, user })
      );
      dispatch(addCardFailure(error as string, failedTransaction));
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
      const failedTransaction: Transaction = createTransaction(
        "updateCard",
        JSON.stringify({ card })
      );
      dispatch(updateCardFailure(error as string, failedTransaction));
    }
  };

export const executeFailedTransactions =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function, getState) => {
    const state = getState();
    if (state.cardsState.failedTransactions.length > 0) {
      dispatch(clearFailedTransactions());
      const failedTransactions = state.cardsState.failedTransactions;

      failedTransactions.map((transaction) => {
        const params = JSON.parse(transaction.parameters);
        switch (transaction.thunkAction) {
          case "addCard":
            dispatch(addCard(params.card, params.user, true));
            break;
          case "updateCard":
            dispatch(updateCard(params.card));
            break;
          default:
            break;
        }
      });
    }
  };
