import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Theme,
} from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { FC } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        imageList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        title: {
            color: theme.palette.primary.light,
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
    }),
);

export interface IImagesListProps {
    images: string[];
}

export const ImagesList: FC<IImagesListProps> = ({ images }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList className={classes.imageList} cols={2}>
                {images.map((image, i) => (
                    <ImageListItem key={i}>
                        <img src={image} alt={'i'} />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};
