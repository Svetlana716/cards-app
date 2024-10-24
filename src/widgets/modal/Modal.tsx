import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import { FC, FormEvent } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch } from '../../store/hooks';
import { fetchCreateCard } from '../../store/cards/actions';

export interface IModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}
export const Modal: FC<IModalProps> = ({ isModalOpen, closeModal }) => {
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
        <Dialog
            aria-modal
            disableEnforceFocus
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="form-dialog-title"
            aria-describedby="form-dialog-description"
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle id="form-dialog-title">Create Card</DialogTitle>
            <DialogContent>
                <DialogContentText id="form-dialog-description">
                    Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.
                </DialogContentText>

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
                <DialogActions>
                    <Button type="submit">Create</Button>
                    <Button
                        onClick={closeModal}
                        variant="outlined"
                        color="error"
                    >
                        Close
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
