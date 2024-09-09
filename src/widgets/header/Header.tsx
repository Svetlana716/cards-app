import { AppBar, Theme, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { CameraswitchOutlined } from '@mui/icons-material';

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
                <CameraswitchOutlined className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                    Album layout
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
