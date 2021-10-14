import Card from "../models/Card";
import { ActionTypes } from "./actionTypes";
import { CardsActions } from "./actions";
import { AccountAction } from "../account/actions";
import { ActionTypes as AccountActionTypes } from "../account/actionTypes";

export type CardsState = {
  cards: Card[];
  loadingAddingCard: boolean;
  loadingGettingCards: boolean;
  loadingUpdatingCard: boolean;
  errorGettingCards?: string;
  errorAddingCard?: string;
  errorUpdatingCard?: string;
};

export const cardsInitialState: CardsState = {
  cards: [],
  loadingAddingCard: false,
  loadingGettingCards: false,
  loadingUpdatingCard: false,
  errorGettingCards: undefined,
  errorAddingCard: undefined,
  errorUpdatingCard: undefined,
};

const cardsReducer = (
  state: CardsState = cardsInitialState,
  action: CardsActions | AccountAction
) => {
  switch (action.type) {
    case ActionTypes.ADD_CARD_START:
      return {
        ...state,
        loadingAddingCard: true,
        errorAddingCard: undefined,
      };
    case ActionTypes.ADD_CARD_SUCCESS:
      return {
        ...state,
        loadingAddingCard: false,
        //In case this doesn't work we can try [...state.cards,action.newCard]
        cards: [action.newCard, ...state.cards],
      };
    case ActionTypes.ADD_CARD_FAILURE:
      return {
        ...state,
        loadingAddingCard: false,
        errorAddingCard: action.errorMessage,
      };
    case ActionTypes.GET_CARDS_START:
      return {
        ...state,
        loadingGettingCards: true,
        errorGettingCards: undefined,
      };
    case ActionTypes.GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.cards,
        loadingGettingCards: false,
      };
    case ActionTypes.GET_CARDS_FAILURE:
      return {
        ...state,
        loadingGettingCards: false,
        errorGettingCards: action.errorMessage,
      };
    case ActionTypes.GET_CARDS_AFTER_ID_START:
      return {
        ...state,
        loadingGettingCards: true,
        errorGettingCards: undefined,
      };
    case ActionTypes.GET_CARDS_AFTER_ID_SUCCESS:
      return {
        ...state,
        cards: [...state.cards, ...action.cards],
        loadingGettingCards: false,
      };
    case ActionTypes.GET_CARDS_AFTER_ID_FAILURE:
      return {
        ...state,
        loadingGettingCards: false,
        errorGettingCards: action.errorMessage,
      };
    case ActionTypes.GET_CARDS_BY_TITLE_START:
      return {
        ...state,
        loadingGettingCards: true,
        errorGettingCards: undefined,
      };
    case ActionTypes.GET_CARDS_BY_TITLE_SUCCESS:
      return {
        ...state,
        cards: [...action.cards],
        loadingGettingCards: false,
      };
    case ActionTypes.GET_CARDS_BY_TITLE_FAILURE:
      return {
        ...state,
        loadingGettingCards: false,
        errorGettingCards: action.errorMessage,
      };
    case ActionTypes.UPDATE_CARD_START:
      return {
        ...state,
        loadingUpdatingCard: true,
        errorUpdatingCard: undefined,
      };
    case ActionTypes.UPDATE_CARD_SUCCESS:
      const newCards = state.cards.map((card) =>
        card.id !== action.updatedCard.id ? card : action.updatedCard
      );
      return {
        ...state,
        loadingUpdatingCard: false,
        cards: newCards,
      };
    case ActionTypes.UPDATE_CARD_FAILURE:
      return {
        ...state,
        loadingUpdatingCard: false,
        errorUpdatingCard: action.errorMessage,
      };
    case ActionTypes.CLEAR_CARDS:
      return {
        ...state,
        cards: [],
      };
    case AccountActionTypes.SIGN_OUT:
      return {
        ...cardsInitialState,
      };
    default:
      return state;
  }
};

export default cardsReducer;
