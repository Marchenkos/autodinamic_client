import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props: any) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export interface AlertModalProps {
    text: string;
    isOpen: boolean;
    handleRejectModal: () => void;
    handleConfirmModal: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = React.memo(function AlertModal({
    text,
    isOpen,
    handleRejectModal,
    handleConfirmModal,
}) {
    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            maxWidth="xs"
            open={isOpen}
            onClose={handleRejectModal}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleConfirmModal} color="primary">
                    да
                </Button>
                <Button onClick={handleRejectModal} color="primary">
                    нет
                </Button>
            </DialogActions>
        </Dialog>
    );
});
