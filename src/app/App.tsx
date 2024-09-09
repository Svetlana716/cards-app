import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { MainPage } from '../pages/main-page/MainPage';

export default function App() {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainPage />
        </ThemeProvider>
    );
}
