import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { MainPage } from '../pages/main-page/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from '../pages/not-found-page/NotFoundPage';
import { lazy } from 'react';

const PageWrapper = lazy(() => import('../widgets/page-wrapper/PageWrapper'));
const CardPage = lazy(() => import('../pages/card-page/CardPage'));

export const App = () => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PageWrapper />}>
                        <Route index element={<MainPage />} />
                        <Route path="/:id" element={<CardPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};
