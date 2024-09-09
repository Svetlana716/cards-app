import { createSlice } from '@reduxjs/toolkit';
import { fetchDeleteCard, fetchGetCards } from './actions';
import { CardsState } from './types';

const initialState: CardsState = {
    cards: [],
    likedCards: [],
    loading: false,
    error: null,
};

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        likeCard(state, { payload }) {
            const likeElementIndex = state.cards.findIndex(
                item => item.id === payload,
            );
            state.cards[likeElementIndex].liked =
                !state.cards[likeElementIndex].liked;
        },
        filterCard(state) {
            state.cards = state.cards.filter(card => card.liked === true);
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
                state.cards = payload;
            })
            .addCase(fetchGetCards.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            })

            .addCase(fetchDeleteCard.fulfilled, (state, { payload }) => {
                state.cards = state.cards.filter(card => card.id !== payload);
            });
    },
});
export const { likeCard, filterCard } = cardSlice.actions;
export const cardsReducer = cardSlice.reducer;
