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
import { ICardItem } from '../../../models/ICardItem';
import { useAppDispatch } from '../../../store/hooks';
import { fetchDeleteCard } from '../../../store/cards/actions';
import { likeCard } from '../../../store/cards/slice';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';

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
        paddingTop: '56.25%', // 16:9
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
}));

export interface ICardItemProps {
    card: ICardItem;
}
export const CardItem: FC<ICardItemProps> = ({ card }) => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const handleLikeCard = (id: number) => {
        dispatch(likeCard(id));
    };

    const handleDeleteCard = (id: number) => {
        dispatch(fetchDeleteCard(id));
    };

    const likeColor = card.liked ? pink[500] : 'disabled';

    return (
        <Grid2 key={card.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={card.images[0]}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography
                        className={classes.cardText}
                        gutterBottom
                        variant="h5"
                        component="h2"
                    >
                        {card.title}
                    </Typography>
                    <Typography className={classes.cardText}>
                        {card.description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <IconButton
                        onClick={() => handleLikeCard(card.id)}
                        size="small"
                        color="primary"
                    >
                        <FavoriteIcon sx={{ color: likeColor }} />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteCard(card.id)}
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
