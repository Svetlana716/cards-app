import { ICardItem } from '../../models/ICardItem';

export interface CardsState {
    cards: ICardItem[];
    totalCards: number;
    currentCard: ICardItem | null;
    likes: number[];
    isFavour: boolean;
    loading: boolean;
    error: string | null | undefined;
}
