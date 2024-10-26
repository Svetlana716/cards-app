import { createSlice } from '@reduxjs/toolkit';
import { FactsState } from './types';
import { fetchGetRandomFact } from './actions';

const initialState: FactsState = {
    fact: null,
    loading: false,
    error: null,
};

const factsSlice = createSlice({
    name: 'facts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchGetRandomFact.pending, state => {
                state.loading = true;
                state.error = null;
                state.fact = null;
            })
            .addCase(fetchGetRandomFact.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.error = null;
                state.fact = payload;
            })
            .addCase(fetchGetRandomFact.rejected, (state, { error }) => {
                state.loading = false;
                state.error = error.message;
            });
    },
});

export const factsReducer = factsSlice.reducer;
