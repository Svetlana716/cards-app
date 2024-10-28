import { CircularProgress, Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGetRandomFact } from '../../store/facts/actions';
import { getFactsPath } from '../../store/facts/selectors';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        minHeight: '250px',
        padding: theme.spacing(2, 2, 2),
    },
    buttons: {
        marginTop: theme.spacing(4),
    },
}));

const FactsBar: FC = memo(() => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGetRandomFact());
    }, []);
    console.log('FactsBar');
    const { fact, loading, error } = useAppSelector(getFactsPath);
    return (
        <Paper elevation={24} className={classes.paper}>
            <Typography variant="h5" align="center" color="textPrimary">
                {loading && <CircularProgress color="inherit" />}
                {error && <p>{error}</p>}
                {fact?.fact}
            </Typography>
        </Paper>
    );
});
export default FactsBar;
