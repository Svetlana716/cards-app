import {
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
} from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export interface IModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
}
export const Modal: FC<IModalProps> = ({
    isModalOpen,
    closeModal,
    children,
}) => {
    useEffect(() => {
        const handleEscClose = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    }, []);

    return (
        <Dialog
            aria-modal
            closeAfterTransition={false}
            disableEnforceFocus
            open={isModalOpen}
            onClose={closeModal}
            aria-labelledby="form-dialog-title"
            aria-describedby="form-dialog-description"
        >
            <DialogActions>
                <IconButton onClick={closeModal}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
};
