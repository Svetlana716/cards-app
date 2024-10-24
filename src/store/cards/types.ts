import { ICardItem, IResponse } from '../../models/ICardItem';

export interface CardsState {
    cards: ICardItem[];
    total: number;
    currentCard: ICardItem | null;
    likes: number[];
    isFavour: boolean;
    loading: boolean;
    error: string | null | undefined;
}
