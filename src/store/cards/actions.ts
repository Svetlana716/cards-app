import { createCard, deleteCard, getCardById, getCards } from '../../utils/api';
import { ICreatingCardItem } from '../../models/ICardItem';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGetCards = createAsyncThunk(
    'cards/fetchGetCards',
    async (params: string) => {
        return await getCards(params);
    },
);

export const fetchGetCardById = createAsyncThunk(
    'cards/fetchGetCardById',
    async (id: string) => {
        return await getCardById(id);
    },
);

export const fetchDeleteCard = createAsyncThunk(
    'cards/fetchDeleteCard',
    async (id: string) => {
        return await deleteCard(id);
    },
);

export const fetchCreateCard = createAsyncThunk(
    'cards/fetchCreateCards',
    async (payload: ICreatingCardItem) => {
        return await createCard(payload);
    },
);
