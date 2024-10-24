import { AppBar, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { CameraswitchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
}));

export const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <Link to={'/'}>
                    <CameraswitchOutlined className={classes.icon} />
                </Link>
                <Typography variant="h6" color="inherit" noWrap>
                    Album layout
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
