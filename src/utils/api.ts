import axios from 'axios';
import { API_KEY, factsURL, URL } from './constants';
import { ICardItem, ICreatingCardItem, IResponse } from '../models/ICardItem';
import { IFact } from '../models/IFact';

const api = axios.create({
    baseURL: URL,
    headers: { 'x-api-key': API_KEY },
});

api.interceptors.response.use(
    response => response,
    error => {
        Promise.reject(error);
        console.log(error);
    },
);

//апи фактов о котах
const factsApi = axios.create({
    baseURL: factsURL,
    headers: { Accept: 'application/json' },
});

factsApi.interceptors.response.use(
    response => response,
    error => {
        Promise.reject(error);
        console.log(error);
    },
);

//TODO: axios-cache-adapter

//карточки
export const getCards = async (params: string): Promise<IResponse> => {
    const { data, headers } = await api.get<ICardItem[]>(
        `/images/search?${params}`,
    );
    //получаем из ответа данные из body и headers(данные о количестве возвращаемых элементов)
    //возвращаем обект с данными и количеством этих данных
    return { cards: data, count: headers['pagination-count'] };
};

export const getCardById = async (id: string) => {
    const { data } = await api.get<ICardItem>(`/images/${id}`);
    return data;
};

export const deleteCard = async (id: string) => {
    await api.delete<string>(`/images/${id}`);
    return id;
};

export const createCard = async (body: ICreatingCardItem) => {
    const { data } = await api.post<ICardItem>('/api/v1/products/', body);
    return data;
};

//факты
export const getRandomFact = async () => {
    const { data } = await factsApi.get<IFact>('/fact');
    return data;
};
