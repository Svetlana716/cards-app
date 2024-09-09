import { Button, Container, Grid2, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, useState } from 'react';
import { CardsList } from './cards-list/CardsList';

const useStyles = makeStyles((theme: Theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));

export const Main: FC = () => {
    const classes = useStyles();

    const [liked, setLiked] = useState<boolean>(false);

    console.log(liked);

    return (
        <main>
            <div className={classes.heroContent}>
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                    >
                        Album layout
                    </Typography>
                    <Typography
                        variant="h5"
                        align="center"
                        color="textSecondary"
                    >
                        Something short and leading about the collection
                        below—its contents, the creator, etc. Make it short and
                        sweet, but not too short so folks don&apos;t simply skip
                        over it entirely.
                    </Typography>
                    <div className={classes.heroButtons}>
                        <Grid2 container spacing={2} justifyContent="center">
                            <Grid2>
                                <Button
                                    onClick={() =>
                                        setLiked(prevActive => !prevActive)
                                    }
                                    variant="contained"
                                    color="primary"
                                >
                                    Favorite
                                </Button>
                            </Grid2>
                            <Grid2>
                                <Button variant="outlined" color="primary">
                                    Create card
                                </Button>
                            </Grid2>
                        </Grid2>
                    </div>
                </Container>
            </div>
            <CardsList filter={liked} />
        </main>
    );
};
