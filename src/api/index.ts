import axios, { AxiosResponse } from "axios";
import { User } from "../models/User";
import Card from "../models/Card";

export const WS_ENDPOINT = "http://localhost:5000/hub";
const API_ENDPOINT = "http://localhost:5000/";
const axiosInstance = axios.create({ baseURL: API_ENDPOINT });

export const loginApi = (username: string, password: string): Promise<User> => {
  return axiosInstance
    .get(`login?username=${username}&password=${password}`)
    .then((res: AxiosResponse) => {
      return res.data;
    });
};

export const getLoggedUserApi = () => {
  return axiosInstance.get("getLoggedUser").then((res: AxiosResponse) => {
    return res.data;
  });
};

export const logOutApi = () => {
  return axiosInstance.get("logout").then((res: AxiosResponse) => {
    return res.data;
  });
};

export const getAllCardsApi = (): Promise<Card[]> => {
  return axiosInstance.get("card").then((res: AxiosResponse) => {
    return res.data;
  });
};

export const addCardApi = (card: Card): Promise<Card> => {
  return axiosInstance.post("card", card).then((res) => res.data);
};

export const updateCardApi = (card: Card): Promise<Card> => {
  return axiosInstance.put("card", card).then((res) => res.data);
};
