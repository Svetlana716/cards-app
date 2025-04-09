import { FC } from 'react';
import { IBreeds } from '../../../models/ICardItem';
import { Box, Button, Typography } from '@mui/material';
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
                {breeds.length ? breeds[0].name : ''}
            </Typography>
            <Box
                component="img"
                sx={{
                    height: '100%',
                    width: '100%',
                }}
                alt="Фото кота"
                src={url}
            />
            {breeds.length && (
                <Link to={`/${id}`}>
                    <Button variant="text">About breed</Button>
                </Link>
            )}
        </>
    );
};
export default CardInfo;
