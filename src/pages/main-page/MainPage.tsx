import { Button, Grid2, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { useModal } from '../../hooks/useModal';
import { CardsList } from '../../widgets/card-list/CardsList';
import { Modal } from '../../widgets/modal/Modal';
import { fetchGetRandomFact } from '../../store/facts/actions';
import { CreateCardForm } from '../../widgets/modal/create-card-form/CreateCardForm';
import FactsBar from '../../widgets/facts-bar/FactsBar';

const useStyles = makeStyles((theme: Theme) => ({
    buttons: {
        marginTop: theme.spacing(4),
    },
}));

const MainPage: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { isModalOpen, closeModal, openModal } = useModal();

    console.log('MainPage');
    return (
        <>
            <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
            >
                Meow Club
            </Typography>
            <FactsBar />
            <div className={classes.buttons}>
                <Grid2 container spacing={2} justifyContent="center">
                    <Grid2>
                        <Button
                            onClick={() => dispatch(fetchGetRandomFact())}
                            variant="contained"
                            color="primary"
                        >
                            New cat fact
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
            <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
                <CreateCardForm closeModal={closeModal} />
            </Modal>
            <CardsList />
        </>
    );
};

export default MainPage;
