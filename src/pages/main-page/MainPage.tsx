import {
    Button,
    CircularProgress,
    Grid2,
    Paper,
    Theme,
    Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useModal } from '../../hooks/useModal';
import { CardsList } from '../../widgets/card-list/CardsList';
import { Modal } from '../../widgets/modal/Modal';
import { fetchGetRandomFact } from '../../store/facts/actions';
import { getFactsPath } from '../../store/facts/selectors';
import { CreateCardForm } from '../../widgets/modal/create-card-form/CreateCardForm';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        minHeight: '250px',
        padding: theme.spacing(2, 2, 2),
    },
    buttons: {
        marginTop: theme.spacing(4),
    },
}));

const MainPage: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { isModalOpen, closeModal, openModal } = useModal();

    useEffect(() => {
        dispatch(fetchGetRandomFact());
    }, []);

    const { fact, loading, error } = useAppSelector(getFactsPath);

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
            <Paper elevation={24} className={classes.paper}>
                <Typography variant="h5" align="center" color="textPrimary">
                    {loading && <CircularProgress color="inherit" />}
                    {error && <p>{error}</p>}
                    {fact?.fact}
                </Typography>
            </Paper>
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
