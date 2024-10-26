import { createSlice } from '@reduxjs/toolkit';
import {
    fetchCreateCard,
    fetchDeleteCard,
    fetchGetCardById,
    fetchGetCards,
} from './actions';
import { CardsState } from './types';

const initialState: CardsState = {
    cards: [],
    totalCards: 0,
    currentCard: null,
    likes: [],
    isFavour: false,
    loading: false,
    error: null,
};

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        changesFavour(state) {
            state.isFavour = !state.isFavour;
        },

        addFavour(state, { payload }) {
            if (state.likes.includes(payload)) {
                state.likes = state.likes.filter(id => id !== payload);
                return;
            }
            state.likes.push(payload);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGetCards.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetCards.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.cards = payload.cards;
                state.totalCards = payload.count;
            })
            .addCase(fetchGetCards.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })

            .addCase(fetchGetCardById.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetCardById.fulfilled, (state, { payload }) => {
                state.loading = true;
                state.error = null;
                state.currentCard = payload;
            })
            .addCase(fetchGetCardById.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })

            .addCase(fetchCreateCard.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.cards.push(payload);
            })

            .addCase(fetchDeleteCard.fulfilled, (state, { payload }) => {
                state.cards = state.cards.filter(card => card.id !== payload);
            });
    },
});
export const { changesFavour, addFavour } = cardSlice.actions;
export const cardsReducer = cardSlice.reducer;
