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
import { Link } from 'react-router-dom';

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

    /*  const [{ name }] = breeds; */

    return (
        <Grid2 key={id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className={classes.card}>
                <Link className={classes.link} to={`/${id}`}>
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
                </Link>
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
        </Grid2>
    );
};
