import { ICardItem } from '../../models/ICardItem';

export interface CardsState {
    cards: ICardItem[];
    likedCards: ICardItem[];
    loading: boolean;
    error: string | null | undefined;
}
