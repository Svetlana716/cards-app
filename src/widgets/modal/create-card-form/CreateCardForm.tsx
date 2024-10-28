import {
    Button,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { FC, FormEvent } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { useForm } from '../../../hooks/useForm';
import { fetchCreateCard } from '../../../store/cards/actions';

export interface ICreateCardFormProps {
    closeModal: () => void;
}
export const CreateCardForm: FC<ICreateCardFormProps> = ({ closeModal }) => {
    const dispatch = useAppDispatch();
    const { values, handleChange } = useForm({
        title: '',
        price: '',
        description: '',
        categoryId: '',
        imagesArr: '',
    });

    let { title, description, imagesArr } = values;
    const price = +values.price;
    const categoryId = +values.categoryId;
    const images = values.imagesArr?.split(' ');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(
            fetchCreateCard({
                title,
                price,
                description,
                categoryId,
                images,
            }),
        );
        closeModal();
    };

    return (
        <>
            <DialogTitle id="form-dialog-title">Create Card</DialogTitle>
            <DialogContentText id="form-dialog-description">
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
            </DialogContentText>
            <form onSubmit={handleSubmit}>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="title"
                    label="title"
                    type="text"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={title}
                    name="title"
                ></TextField>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="price"
                    label="price"
                    type="text"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={price}
                    name="price"
                ></TextField>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    label="description"
                    type="text"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={description}
                    name="description"
                ></TextField>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="category id"
                    label="category id"
                    type="text"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={categoryId}
                    name="categoryId"
                ></TextField>

                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="images"
                    label="images"
                    type="text"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={imagesArr}
                    name="imagesArr"
                ></TextField>
                <Button type="submit">Create</Button>
            </form>
        </>
    );
};
