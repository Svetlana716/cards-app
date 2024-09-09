import axios from 'axios';
import { URL } from './constants';
import { ICardItem } from '../models/ICardItem';

const api = axios.create({
    baseURL: URL,
});

api.interceptors.response.use(
    response => response,
    error => {
        Promise.reject(error);
        console.log(error);
    },
);

// получение списка карточек
export const getCards = async () => {
    const res = await api.get<ICardItem[]>('/api/v1/products');
    return res.data;
};

export const deleteCard = async (id: number) => {
    await api.delete(`/api/v1/products/${id}`);
    return id;
};

export const createCard = async (body: ICardItem) => {
    return await api.post<ICardItem>('/photos', body);
};
