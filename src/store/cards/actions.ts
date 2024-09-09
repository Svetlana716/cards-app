import { createCard, deleteCard, getCards } from '../../utils/api';
import { ICardItem } from '../../models/ICardItem';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGetCards = createAsyncThunk(
    'cards/fetchGetCards',
    async () => {
        return await getCards();
    },
);

export const fetchDeleteCard = createAsyncThunk(
    'cards/fetchDeleteCard',
    async (payload: number) => {
        return await deleteCard(payload);
    },
);

export const fetchCreateCards = createAsyncThunk(
    'cards/fetchCreateCards',
    async (payload: ICardItem, { rejectWithValue }) => {
        try {
            return await createCard(payload);
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    },
);
