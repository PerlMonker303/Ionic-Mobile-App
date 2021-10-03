import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { getCurrentUser } from "../account/selectors";
import { addCardApi, getAllCardsApi, updateCardApi } from "../api";
import { RootState } from "../store/reducers";
import {
  addCardFailure,
  addCardStart,
  addCardSuccess,
  getCardsFailure,
  getCardsStart,
  getCardsSuccess,
  updateCardFailure,
  updateCardStart,
  updateCardSuccess,
} from "./actions";
import Card from "../models/Card";
import { CardsState } from "./reducer";
import { setAddedCard } from "../account/actions";

export const fetchCards =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function) => {
    dispatch(getCardsStart());
    try {
      const cards: Card[] = await getAllCardsApi();

      dispatch(getCardsSuccess(cards));
    } catch (error) {
      dispatch(getCardsFailure(error as string));
    }
  };

export const addCard =
  (card: Card): ThunkAction<void, CardsState, unknown, Action<string>> =>
  async (dispatch: Function) => {
    dispatch(addCardStart());
    try {
      await addCardApi(card);

      if (!card.image.startsWith("data:image/png;base64,")) {
        card.image = "data:image/png;base64," + card.image;
      }

      dispatch(addCardSuccess(card));
      dispatch(setAddedCard(true));
    } catch (error) {
      dispatch(addCardFailure(error as string));
    }
  };

export const updateCard =
  (card: Card): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Function) => {
    dispatch(updateCardStart());
    try {
      await updateCardApi(card);

      if (!card.image.startsWith("data:image/png;base64,")) {
        card.image = "data:image/png;base64," + card.image;
      }

      dispatch(updateCardSuccess(card));
    } catch (error) {
      dispatch(updateCardFailure(error as string));
    }
  };
