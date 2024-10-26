import { configureStore } from '@reduxjs/toolkit';
import { cardsReducer } from './cards/slice';
import { factsReducer } from './facts/slice';

export const store = configureStore({
    reducer: {
        cards: cardsReducer,
        facts: factsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
