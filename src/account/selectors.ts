import { createSelector } from "reselect";
import { RootState } from "../store/reducers";

export const getAccountState = (state: RootState) => state.accountState;

export const getCurrentUser = createSelector(
  getAccountState,
  (account) => account.currentUser
);

export const getIsLoading = createSelector(
  getAccountState,
  (account) => account.isLoading
);

export const getErrorMessage = createSelector(
  getAccountState,
  (account) => account.error
);

export const getAddedCard = createSelector(
  getAccountState,
  (account) => account.addedCard
);
