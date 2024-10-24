import {
    Backdrop,
    CircularProgress,
    Container,
    Grid2,
    Pagination,
    PaginationItem,
    Stack,
    Theme,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import { FC, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGetCards } from '../../store/cards/actions';
import { getCardsPath } from '../../store/cards/selectors';
import { getLikeFromLocalStorage } from '../../utils/localStorage';
import { CardItem } from '../card-item/CardItem';
import { cardsPerPage } from '../../utils/constants';
import { Link, useSearchParams } from 'react-router-dom';
import { ICardItem } from '../../models/ICardItem';

const useStyles = makeStyles((theme: Theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

export const CardsList: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams({
        page: '1',
        limit: cardsPerPage.toString(),
    });
    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        dispatch(fetchGetCards(searchParams.toString()));
    }, [searchParams]);

    const { cards, total, loading, error, isFavour } =
        useAppSelector(getCardsPath);

    //TODO: add isFavour to localsrorage

    //TODO: add has_breeds to localsrorage

    const likes = getLikeFromLocalStorage();

    //проверка на то что массив breeds не пуст
    /* const checkCardsArray = cards.filter(card => card.breeds.length > 0); */

    const cardsForRendering = useMemo(() => {
        if (isFavour) {
            return cards.filter(card => likes.includes(card.id));
        }
        return cards;
    }, [isFavour, cards]);

    const paginateSlots = Math.ceil(total / cardsPerPage);

    const handleChange = (
        e: React.ChangeEvent<unknown>,
        pageNumber: number,
    ) => {
        e.preventDefault();
        setSearchParams({
            page: (pageNumber - 1).toString(),
            limit: cardsPerPage.toString(),
        });
    };

    return (
        <>
            <Container className={classes.cardGrid}>
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
                <Grid2 container spacing={4}>
                    {cardsForRendering.map(card =>
                        card.breeds.length > 0 ? (
                            <CardItem key={card.id} {...card} />
                        ) : (
                            <CardItem key={card.id} {...card} />
                        ),
                    )}
                </Grid2>
            </Container>
            {paginateSlots > 1 && (
                <Stack sx={{ alignItems: 'center' }}>
                    <Pagination
                        count={paginateSlots}
                        page={page + 1}
                        color="primary"
                        onChange={handleChange}
                        showFirstButton
                        showLastButton
                        sx={{ marginY: 3, marginX: 'auto' }}
                    />
                </Stack>
            )}
        </>
    );
};
