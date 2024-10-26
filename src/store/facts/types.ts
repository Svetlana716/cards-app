import { IFact } from '../../models/IFact';

export interface FactsState {
    fact: IFact | null;
    loading: boolean;
    error: string | null | undefined;
}
