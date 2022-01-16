import React, { useCallback } from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getToastState } from './selectors';
import { HIDE_TOAST } from './actions';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" severity={props.severity} {...props} />;
}

export const Toast: React.FC = React.memo(function Toast() {
    const dispatch = useDispatch();
    const toast = useSelector(getToastState);

    const handleClose = useCallback(
        (event: any, reason: string) => {
            if (reason === 'clickaway') {
                return;
            }

            dispatch(HIDE_TOAST());
        },
        [dispatch]
    );

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={toast.active}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={toast.status}>
                {toast.message}
            </Alert>
        </Snackbar>
    );
});
