import { FC } from 'react';
import { IBreeds } from '../../../models/ICardItem';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export interface ICardInfoProps {
    url: string;
    breeds: IBreeds[];
    id: string;
}
const CardInfo: FC<ICardInfoProps> = ({ url, breeds, id }) => {
    return (
        <>
            <Typography gutterBottom variant="h5" component="h2" align="center">
                {breeds.length > 0 ? breeds[0].name : ''}
            </Typography>
            <img
                src={url}
                alt="Пример"
                style={{ width: '100%', height: 'auto' }}
            />
            {breeds.length > 0 && (
                <Link to={`/${id}`}>
                    <Button variant="text">About breed</Button>
                </Link>
            )}
        </>
    );
};
export default CardInfo;
