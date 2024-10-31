import {
    Backdrop,
    Button,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid2,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    Stack,
    Switch,
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
import { useSearchParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    filters: {
        justifyContent: 'right',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    select: {
        minWidth: '120px',
    },
}));

export const CardsList: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [breed, setBreed] = useState(
        JSON.parse(searchParams.get('has_breeds') || 'false'),
    );

    const [order, setOrder] = useState(searchParams.get('order') || 'ASC');

    const [page, setPage] = useState(
        parseInt(searchParams.get('page') || '1', 10),
    );

    const params = {
        page: page.toString(),
        limit: cardsPerPage.toString(),
        has_breeds: breed.toString(),
        order,
    };

    useEffect(() => {
        dispatch(fetchGetCards(searchParams.toString()));
    }, [searchParams]);

    useEffect(() => {
        setSearchParams(params);
    }, []);

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

    console.log(totalCards);

    //пагинация
    const handlePaginationChange = (
        e: React.ChangeEvent<unknown>,
        pageNumber: number,
    ) => {
        e.preventDefault();
        setPage(pageNumber - 1);
        setSearchParams(params => {
            params.set('page', (pageNumber - 1).toString());
            return params;
        });
    };

    const paginateSlots = useMemo(() => {
        return Math.ceil(totalCards / cardsPerPage);
    }, [totalCards]);

    //переключатель has_breed
    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBreed(event.target.checked);
        setSearchParams(params => {
            params.set('has_breeds', event.target.checked.toString());
            return params;
        });
    };

    //выбор порядка карточек
    const handleSelectChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        setOrder(value);
        setSearchParams(params => {
            params.set('order', value);
            return params;
        });
    };

    console.log('CardsList');
    return (
        <>
            <Container className={classes.cardGrid}>
                <Grid2 container spacing={2} className={classes.filters}>
                    <Grid2>
                        <FormGroup>
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
                        </FormGroup>
                    </Grid2>
                    <Grid2 className={classes.select}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Order
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={order}
                                label="order"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={'ASC'}>ascending</MenuItem>
                                <MenuItem value={'DESC'}>descending</MenuItem>
                                <MenuItem value={'RANDOM'}>random</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>
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
