import { Grid2, IconButton, Link, Paper, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCardsPath } from '../../store/cards/selectors';
import { fetchGetCardById } from '../../store/cards/actions';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/* const useStyles = makeStyles((theme: Theme) => ({
    image: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
})); */

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    width: '100%',
});

const CardPage: FC = () => {
    /* const classes = useStyles(); */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { cards, currentCard } = useAppSelector(getCardsPath);
    const card = cards.find(el => el.id === id) || currentCard;

    useEffect(() => {
        if (!card && id) {
            dispatch(fetchGetCardById(id));
        }
    }, []);

    const handleBackClick = () => {
        // Возвращаемся к предыдущему пути при закрытии модалки
        navigate(-1);
    };

    if (!card) {
        return null;
    }

    console.log('CardPage');

    const [{ name, description, wikipedia_url }] = card.breeds;
    return (
        <Paper
            sx={theme => ({
                p: 2,
                margin: 'auto',
                flexGrow: 1,
                backgroundColor: '#fff',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#1A2027',
                }),
            })}
        >
            <Grid2 container spacing={4}>
                <Grid2>
                    <Img alt="cat" src={card?.url} />
                </Grid2>
                <Grid2 container>
                    <Grid2 container direction="column" spacing={2}>
                        <Grid2>
                            <Typography gutterBottom variant="subtitle1">
                                {name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {description}
                            </Typography>
                        </Grid2>
                        <Grid2>
                            <Link
                                href={wikipedia_url}
                                rel="noopener"
                                underline="hover"
                            >
                                Learn more
                            </Link>
                        </Grid2>
                    </Grid2>
                </Grid2>

                <IconButton onClick={handleBackClick}>
                    <ArrowBackIcon />
                </IconButton>
            </Grid2>
        </Paper>
    );
};

export default CardPage;
