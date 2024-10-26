import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid2,
    IconButton,
    Theme,
    Typography,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import { FC } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchDeleteCard } from '../../store/cards/actions';
import { addFavour } from '../../store/cards/slice';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import {
    getLikeFromLocalStorage,
    setLikeToLocalStorage,
} from '../../utils/localStorage';
import { useModal } from '../../hooks/useModal';
import CardInfo from '../modal/card-info/CardInfo';
import { Modal } from '../modal/Modal';

const useStyles = makeStyles((theme: Theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
    },
    cardActions: {
        justifyContent: 'space-between',
        padding: '8px',
    },
    cardText: {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    link: {
        color: 'inherit',
        textDecoration: 'inherit',
        '&:hover': {
            /* background: theme.palette.primary.main, */
            opacity: '0.7',
        },
    },
}));

export const CardItem: FC<any> = ({ id, url, breeds }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { isModalOpen, closeModal, openModal } = useModal();

    const likes = getLikeFromLocalStorage();

    const res = likes.find(like => like === id);

    const likeColor = res ? pink[500] : 'disabled';

    const handleDeleteCard = (id: string) => {
        dispatch(fetchDeleteCard(id));
    };

    const handleLikeCard = (id: string) => {
        dispatch(addFavour(id));
        setLikeToLocalStorage(id);
    };

    const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Проверяем, не был ли клик совершен по кнопке
        if (!(event.target as HTMLElement).closest('button')) {
            openModal();
        }
    };

    /*  const [{ name }] = breeds; */

    return (
        <Grid2 key={id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className={classes.card} onClick={handleCardClick}>
                <CardMedia
                    className={classes.cardMedia}
                    image={url}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography
                        className={classes.cardText}
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {breeds.length > 0 ? breeds[0].name : ''}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <IconButton
                        onClick={() => handleLikeCard(id)}
                        size="small"
                        aria-label="like"
                        color="primary"
                    >
                        <FavoriteIcon sx={{ color: likeColor }} />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteCard(id)}
                        size="small"
                        color="primary"
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
                <CardInfo url={url} breeds={breeds} id={id} />
            </Modal>
        </Grid2>
    );
};
