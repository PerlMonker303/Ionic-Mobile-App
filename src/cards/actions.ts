import Card from "../models/Card";
import { ActionTypes } from "./actionTypes";

export type AddCardStart = {
  type: ActionTypes.ADD_CARD_START;
};

export type AddCardSuccess = {
  type: ActionTypes.ADD_CARD_SUCCESS;
  newCard: Card;
};

export type AddCardFailure = {
  type: ActionTypes.ADD_CARD_FAILURE;
  errorMessage: string;
};

export const addCardStart = (): AddCardStart => ({
  type: ActionTypes.ADD_CARD_START,
});

export const addCardSuccess = (newCard: Card): AddCardSuccess => ({
  type: ActionTypes.ADD_CARD_SUCCESS,
  newCard,
});

export const addCardFailure = (errorMessage: string): AddCardFailure => ({
  type: ActionTypes.ADD_CARD_FAILURE,
  errorMessage,
});

export type GetCardsStart = {
  type: ActionTypes.GET_CARDS_START;
};

export type GetCardsSuccess = {
  type: ActionTypes.GET_CARDS_SUCCESS;
  cards: Card[];
};

export type GetCardsFailure = {
  type: ActionTypes.GET_CARDS_FAILURE;
  errorMessage: string;
};

export const getCardsStart = (): GetCardsStart => ({
  type: ActionTypes.GET_CARDS_START,
});

export const getCardsSuccess = (cards: Card[]): GetCardsSuccess => ({
  type: ActionTypes.GET_CARDS_SUCCESS,
  cards,
});

export const getCardsFailure = (errorMessage: string): GetCardsFailure => ({
  type: ActionTypes.GET_CARDS_FAILURE,
  errorMessage,
});

export type UpdateCardStart = {
  type: ActionTypes.UPDATE_CARD_START;
};

export type UpdateCardSuccess = {
  type: ActionTypes.UPDATE_CARD_SUCCESS;
  updatedCard: Card;
};

export type UpdateCardFailure = {
  type: ActionTypes.UPDATE_CARD_FAILURE;
  errorMessage: string;
};

export const updateCardStart = (): UpdateCardStart => ({
  type: ActionTypes.UPDATE_CARD_START,
});

export const updateCardSuccess = (updatedCard: Card): UpdateCardSuccess => ({
  type: ActionTypes.UPDATE_CARD_SUCCESS,
  updatedCard,
});

export const updateCardFailure = (errorMessage: string): UpdateCardFailure => ({
  type: ActionTypes.UPDATE_CARD_FAILURE,
  errorMessage,
});
export type CardsActions =
  | AddCardStart
  | AddCardSuccess
  | AddCardFailure
  | GetCardsStart
  | GetCardsSuccess
  | GetCardsFailure
  | UpdateCardStart
  | UpdateCardSuccess
  | UpdateCardFailure;
