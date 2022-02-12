import React, { useCallback } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useDispatch, useSelector } from 'react-redux';
import { getSimpleModalState } from '../selectors';
import { HIDE_SIMPLE_MODAL } from '../actions';
import { withStyles } from '@material-ui/core';
import { StyledButton } from '../../../ui/new-styled';

const CssDialog = withStyles({
    root: {
        '& .MuiPaper-root': {
            padding: '20px',
        },
    },
})(Dialog);

export const AppSimpleModal: React.FC = React.memo(function AppSimpleModal() {
    const dispatch = useDispatch();
    const simpleModalState = useSelector(getSimpleModalState);
    const { text, additionalAction, additionalButtonText, active } = simpleModalState;

    const handleClose = useCallback(() => {
        dispatch(HIDE_SIMPLE_MODAL());
    }, [dispatch]);

    return (
        <CssDialog open={active} onClose={handleClose} aria-labelledby="confirmation-dialog-title">
            <DialogTitle id="confirmation-dialog-title">{text}</DialogTitle>
            {additionalAction && additionalButtonText ? (
                <DialogContent>
                    <DialogContentText id="confirmation-dialog-description">
                        <div onClick={additionalAction}>{additionalButtonText}</div>
                    </DialogContentText>
                </DialogContent>
            ) : null}

            <DialogActions>
                <StyledButton additionalStyles={{ width: '100px' }} onClick={handleClose} label="Окей" />
            </DialogActions>
        </CssDialog>
    );
});
