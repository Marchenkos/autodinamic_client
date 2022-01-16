import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;
    background: white;
    padding-bottom: 80px;
    justify-content: center;
    align-items: center;
`;

export const LoadingComponent: React.FC = React.memo(function LoadingComponent() {
    return (
        <LoadingWrapper>
            <CircularProgress style={{ color: '#51acae' }} />
        </LoadingWrapper>
    );
});
