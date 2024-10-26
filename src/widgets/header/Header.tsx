import { AppBar, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        marginRight: theme.spacing(2),
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

export const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <Link className={classes.link} to={'/'}>
                    <PetsIcon className={classes.icon} />
                </Link>
                <Typography variant="h6" color="inherit" noWrap>
                    Paws & Whiskers
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
