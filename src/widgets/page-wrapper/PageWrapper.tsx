import { FC, ReactNode, Suspense } from 'react';
import { Header } from '../../widgets/header/Header';
import { Footer } from '../../widgets/footer/Footer';
import { Container, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Outlet } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));

const PageWrapper: FC = () => {
    const classes = useStyles();
    return (
        <>
            <Header />
            <main>
                <Container className={classes.content}>
                    <Suspense fallback={<p>'Loading...'</p>}>
                        <Outlet />
                    </Suspense>
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default PageWrapper;
