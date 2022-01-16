import React from 'react';
import { makeStyles, Dialog, DialogContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';

import { getFormModalState } from '../selectors';
import styled from 'styled-components';

const StyledCloseIcon = styled(CloseIcon)`
    color: #cacaca;
    position: absolute;
    cursor: pointer;
    top: 15px;
    right: 35px;
    z-index: 2;

    &:hover {
        color: #6f5353;
    }
`;

export const FormModal: React.FC = React.memo(function FormModal() {
    const useStyles = makeStyles(() => ({
        paper: {
            minWidth: '700px',
            '@media (max-width: 850px)': {
                minWidth: '80%',
                height: '50%',
            },
        },
    }));
    const { handleCloseModal, isOpen, content } = useSelector(getFormModalState);

    const classes = useStyles();

    return (
        <Dialog
            classes={{ paper: classes.paper }}
            open={isOpen}
            onClose={handleCloseModal}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-description"
        >
            <DialogContent>
                {handleCloseModal && <StyledCloseIcon onClick={handleCloseModal} />}
                {content}
            </DialogContent>
        </Dialog>
    );
});
