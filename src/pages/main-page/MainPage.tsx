import { FC } from 'react';
import { Header } from '../../widgets/header/Header';
import { Main } from '../../widgets/main/Main';
import { Footer } from '../../widgets/footer/Footer';

export const MainPage: FC = () => {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    );
};
