import Transaction from "../models/Transaction";

export const createTransaction = (thunkAction: string, parameters: string) => {
  const transaction: Transaction = {
    thunkAction,
    parameters,
  };
  return transaction;
};
