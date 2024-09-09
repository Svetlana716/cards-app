import {
    Backdrop,
    CircularProgress,
    Container,
    Grid2,
    Theme,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import { FC, useEffect } from 'react';
import { CardItem } from '../card-item/CardItem';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getCardsPath } from '../../../store/cards/selectors';
import { filterCard } from '../../../store/cards/slice';
import { CardsListProps } from './types';
import { fetchGetCards } from '../../../store/cards/actions';

const useStyles = makeStyles((theme: Theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

export const CardsList: FC<CardsListProps> = ({ filter }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const { cards, loading, error } = useAppSelector(getCardsPath);

    useEffect(() => {
        if (filter) {
            dispatch(filterCard());
        } else {
            dispatch(fetchGetCards());
        }
    }, [filter]);

    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid2 container spacing={4}>
                {loading && (
                    <Backdrop
                        sx={theme => ({
                            color: '#fff',
                            zIndex: theme.zIndex.drawer + 1,
                        })}
                        open={true}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )}
                {error && <p>{error}</p>}
                {cards.map(card => (
                    <CardItem key={card.id} card={card} />
                ))}
            </Grid2>
        </Container>
    );
};
