import axios from 'axios';
import { ICardItem, ICreatingCardItem, IResponse } from '../models/ICardItem';
import { IFact } from '../models/IFact';

const catsApi = axios.create({
    baseURL: import.meta.env.VITE_CATS_API_URL,
    headers: { 'x-api-key': import.meta.env.VITE_API_KEY },
});

catsApi.interceptors.response.use(
    response => response,
    error => {
        Promise.reject(error);
        console.log(error);
    },
);

//апи фактов о котах
const factsApi = axios.create({
    baseURL: import.meta.env.VITE_FACTS_API_URL,
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

//карточки котов
export const getCards = async (params: string): Promise<IResponse> => {
    const { data, headers } = await catsApi.get<ICardItem[]>(
        `/images/search?${params}`,
    );
    //получаем из ответа данные из body и headers(данные о количестве возвращаемых элементов)
    //возвращаем обект с данными и количеством этих данных
    return { cards: data, count: headers['pagination-count'] };
};

export const getCardById = async (id: string) => {
    const { data } = await catsApi.get<ICardItem>(`/images/${id}`);
    return data;
};

export const deleteCard = async (id: string) => {
    await catsApi.delete<string>(`/images/${id}`);
    return id;
};

export const createCard = async (body: ICreatingCardItem) => {
    const { data } = await catsApi.post<ICardItem>('/api/v1/products/', body);
    return data;
};

//факты о котахs
export const getRandomFact = async () => {
    const { data } = await factsApi.get<IFact>('/fact');
    return data;
};
