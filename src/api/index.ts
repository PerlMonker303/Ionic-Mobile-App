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

export const getAllCardsApi = (token: string): Promise<Card[]> => {
  return axiosInstance.get(`card?token=${token}`).then((res: AxiosResponse) => {
    return res.data;
  });
};

export const getCardByIdApi = (id: string, token: string): Promise<Card> => {
  return axiosInstance
    .get(`cardById?id=${id}&token=${token}`)
    .then((res: AxiosResponse) => {
      return res.data;
    });
};

export const getCardsAfterIdApi = (
  afterId: number,
  count: number,
  filterStars: number,
  token: string
): Promise<Card[]> => {
  return axiosInstance
    .get(
      `cardsAfterId?afterId=${afterId}&count=${count}&filterStars=${filterStars}&token=${token}`
    )
    .then((res: AxiosResponse) => {
      return res.data;
    });
};

export const getCardsByTitleApi = (
  title: string,
  token: string
): Promise<Card[]> => {
  return axiosInstance
    .get(`cardsByTitle?title=${title}&token=${token}`)
    .then((res: AxiosResponse) => {
      return res.data;
    });
};

export const getCardsByStarsApi = (
  stars: number,
  token: string
): Promise<Card[]> => {
  return axiosInstance
    .get(`cardsByStars?stars=${stars}&token=${token}`)
    .then((res: AxiosResponse) => {
      return res.data;
    });
};

export const addCardApi = (card: Card, token: string): Promise<Card> => {
  return axiosInstance
    .post(`card?token=${token}`, card)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export const updateCardApi = (card: Card, token: string): Promise<Card> => {
  return axiosInstance.put(`card?token=${token}`, card).then((res) => res.data);
};
