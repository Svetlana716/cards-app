import { RootState } from '../store';

export const getCardsPath = (store: RootState) => store.cards;
export const getCardsLikesPath = (store: RootState) => store.cards.likes;
