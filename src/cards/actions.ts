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

export type GetCardsAfterIdStart = {
  type: ActionTypes.GET_CARDS_AFTER_ID_START;
};

export type GetCardsAfterIdSuccess = {
  type: ActionTypes.GET_CARDS_AFTER_ID_SUCCESS;
  cards: Card[];
};

export type GetCardsAfterIdFailure = {
  type: ActionTypes.GET_CARDS_AFTER_ID_FAILURE;
  errorMessage: string;
};

export const getCardsAfterIdStart = (): GetCardsAfterIdStart => ({
  type: ActionTypes.GET_CARDS_AFTER_ID_START,
});

export const getCardsAfterIdSuccess = (
  cards: Card[]
): GetCardsAfterIdSuccess => ({
  type: ActionTypes.GET_CARDS_AFTER_ID_SUCCESS,
  cards,
});

export const getCardsAfterIdFailure = (
  errorMessage: string
): GetCardsAfterIdFailure => ({
  type: ActionTypes.GET_CARDS_AFTER_ID_FAILURE,
  errorMessage,
});

export type GetCardsByTitleStart = {
  type: ActionTypes.GET_CARDS_BY_TITLE_START;
};

export type GetCardsByTitleSuccess = {
  type: ActionTypes.GET_CARDS_BY_TITLE_SUCCESS;
  cards: Card[];
};

export type GetCardsByTitleFailure = {
  type: ActionTypes.GET_CARDS_BY_TITLE_FAILURE;
  errorMessage: string;
};

export const getCardsByTitleStart = (): GetCardsByTitleStart => ({
  type: ActionTypes.GET_CARDS_BY_TITLE_START,
});

export const getCardsByTitleSuccess = (
  cards: Card[]
): GetCardsByTitleSuccess => ({
  type: ActionTypes.GET_CARDS_BY_TITLE_SUCCESS,
  cards,
});

export const getCardsByTitleFailure = (
  errorMessage: string
): GetCardsByTitleFailure => ({
  type: ActionTypes.GET_CARDS_BY_TITLE_FAILURE,
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

export type ClearCards = {
  type: ActionTypes.CLEAR_CARDS;
};

export const clearCards = (): ClearCards => ({
  type: ActionTypes.CLEAR_CARDS,
});

export type CardsActions =
  | AddCardStart
  | AddCardSuccess
  | AddCardFailure
  | GetCardsStart
  | GetCardsSuccess
  | GetCardsFailure
  | GetCardsAfterIdStart
  | GetCardsAfterIdSuccess
  | GetCardsAfterIdFailure
  | GetCardsByTitleStart
  | GetCardsByTitleSuccess
  | GetCardsByTitleFailure
  | UpdateCardStart
  | UpdateCardSuccess
  | UpdateCardFailure
  | ClearCards;
