import React, { useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useDispatch, useSelector } from 'react-redux';
import { getConfirmModalState } from '../selectors';
import { HIDE_CONFIRM_MODAL } from '../actions';
import { withStyles } from '@material-ui/core';
import { StyledButton } from '../../../ui/new-styled';

const CssDialog = withStyles({
    root: {
        '& .MuiPaper-root': {
            padding: '20px',
        },
    },
})(Dialog);

export const AppConfirmModal: React.FC = React.memo(function AppConfirmModal() {
    const dispatch = useDispatch();
    const confirmModal = useSelector(getConfirmModalState);
    const { onChoose, description, title, active, params } = confirmModal;

    const handleClose = useCallback(
        (value: boolean) => {
            if (onChoose) {
                onChoose(value, params);
            }

            dispatch(HIDE_CONFIRM_MODAL());
        },
        [dispatch, onChoose, params]
    );

    return (
        <CssDialog open={active} onClose={() => handleClose(false)} aria-labelledby="confirmation-dialog-title">
            <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="confirmation-dialog-description">{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <StyledButton isSecondary onClick={() => handleClose(false)} label="Отмена" />
                <StyledButton onClick={() => handleClose(true)} label="Выполнить" />
            </DialogActions>
        </CssDialog>
    );
});
