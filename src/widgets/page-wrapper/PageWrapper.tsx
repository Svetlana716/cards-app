import { FC, ReactNode } from 'react';
import { Header } from '../../widgets/header/Header';
import { Footer } from '../../widgets/footer/Footer';
import { Container, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Outlet } from 'react-router-dom';

/* interface IPageWrapper {
    children: ReactNode;
} */

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));

/* export const PageWrapper: FC<IPageWrapper> = ({ children }) => {
    const classes = useStyles();
    return (
        <>
            <Header />
            <main>
                <Container className={classes.content}>{children}</Container>
            </main>
            <Footer />
        </>
    );
}; */

const PageWrapper: FC = () => {
    const classes = useStyles();
    return (
        <>
            <Header />
            <main>
                <Container className={classes.content}>
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default PageWrapper;