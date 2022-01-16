import { CircularProgress } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
    width: 100px;
    margin: 300px auto 0;
`;

export const LoadingState: React.FC = React.memo(function ConfirmOrder() {
    return (
        <LoadingWrapper>
            <CircularProgress style={{ color: '#51acae' }} />
        </LoadingWrapper>
    );
});
