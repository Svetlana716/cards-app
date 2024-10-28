import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    FormControlLabel,
    FormGroup,
    Grid2,
    Pagination,
    Stack,
    Switch,
    Theme,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGetCards } from '../../store/cards/actions';
import { getCardsPath } from '../../store/cards/selectors';
import { getLikeFromLocalStorage } from '../../utils/localStorage';
import { CardItem } from '../card-item/CardItem';
import { cardsPerPage } from '../../utils/constants';
import { useSearchParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    filters: {
        justifyContent: 'right',
        marginBottom: theme.spacing(1),
    },
}));

export const CardsList: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [breed, setBreed] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams({
        page: '0',
        limit: cardsPerPage.toString(),
        has_breeds: breed.toString(),
    });

    const page = parseInt(searchParams.get('page') || '1', 10);

    useEffect(() => {
        dispatch(fetchGetCards(searchParams.toString()));
    }, [searchParams]);

    const { cards, totalCards, loading, error, isFavour } =
        useAppSelector(getCardsPath);

    //TODO: add isFavour to localsrorage

    const likes = getLikeFromLocalStorage();

    //проверка на то что массив breeds не пуст
    /* const checkCardsArray = cards.filter(card => card.breeds.length > 0); */

    const cardsForRendering = useMemo(() => {
        if (isFavour) {
            return cards.filter(card => likes.includes(card.id));
        }
        return cards;
    }, [isFavour, cards]);

    //пагинация
    const handlePaginationChange = (
        e: React.ChangeEvent<unknown>,
        pageNumber: number,
    ) => {
        e.preventDefault();
        setSearchParams(params => {
            params.set('page', (pageNumber - 1).toString());
            return params;
        });
    };

    const paginateSlots = useMemo(() => {
        return Math.ceil(totalCards / cardsPerPage);
    }, [totalCards]);

    //переключатель

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBreed(event.target.checked);
        setSearchParams(params => {
            params.set('has_breeds', event.target.checked.toString());
            return params;
        });
    };

    console.log(breed);

    console.log('CardsList');
    return (
        <>
            <Container className={classes.cardGrid}>
                <Grid2 container spacing={2} className={classes.filters}>
                    <FormGroup>
                        <Grid2>
                            <FormControlLabel
                                label="pedigreed cats"
                                control={
                                    <Switch
                                        checked={breed}
                                        onChange={handleSwitchChange}
                                        inputProps={{
                                            'aria-label': 'controlled',
                                        }}
                                    />
                                }
                            />
                        </Grid2>
                    </FormGroup>
                </Grid2>
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
                    {cardsForRendering.map(card => (
                        <CardItem key={card.id} {...card} />
                    ))}
                </Grid2>
            </Container>
            {paginateSlots > 1 && (
                <Stack sx={{ alignItems: 'center' }}>
                    <Pagination
                        count={paginateSlots}
                        page={page + 1}
                        color="primary"
                        onChange={handlePaginationChange}
                        showFirstButton
                        showLastButton
                        sx={{ marginY: 3, marginX: 'auto' }}
                    />
                </Stack>
            )}
        </>
    );
};
