import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomFact } from '../../utils/api';

export const fetchGetRandomFact = createAsyncThunk(
    'facts/fetchGetRandomFact',
    async () => await getRandomFact(),
);
