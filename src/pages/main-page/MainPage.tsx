import { Button, Grid2, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { changesFavour } from '../../store/cards/slice';
import { useModal } from '../../hooks/useModal';
import { CardsList } from '../../widgets/card-list/CardsList';
import { Modal } from '../../widgets/modal/Modal';

const useStyles = makeStyles((theme: Theme) => ({
    buttons: {
        marginTop: theme.spacing(4),
    },
}));

const MainPage: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { isModalOpen, closeModal, openModal } = useModal();

    return (
        <>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
            >
                Album layout
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary">
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
            </Typography>
            <div className={classes.buttons}>
                <Grid2 container spacing={2} justifyContent="center">
                    <Grid2>
                        <Button
                            onClick={() => dispatch(changesFavour())}
                            variant="contained"
                            color="primary"
                        >
                            Favorite
                        </Button>
                    </Grid2>
                    <Grid2>
                        <Button
                            onClick={openModal}
                            variant="outlined"
                            color="primary"
                        >
                            Create card
                        </Button>
                    </Grid2>
                </Grid2>
            </div>
            <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
            <CardsList />
        </>
    );
};

export default MainPage;
