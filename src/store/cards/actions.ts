import { createCard, deleteCard, getCardById, getCards } from '../../utils/api';
import { ICreatingCardItem } from '../../models/ICardItem';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGetCards = createAsyncThunk(
    'cards/fetchGetCards',
    async (payload: string) => {
        return await getCards(payload);
    },
);

export const fetchGetCardById = createAsyncThunk(
    'cards/fetchGetCardById',
    async (payload: string) => {
        return await getCardById(payload);
    },
);

export const fetchDeleteCard = createAsyncThunk(
    'cards/fetchDeleteCard',
    async (payload: string) => {
        return await deleteCard(payload);
    },
);

export const fetchCreateCard = createAsyncThunk(
    'cards/fetchCreateCards',
    async (payload: ICreatingCardItem) => {
        return await createCard(payload);
    },
);
