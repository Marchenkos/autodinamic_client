import React from 'react';
import styled from 'styled-components';

import { CheckOrder } from './check-order/check-order.component';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const CheckOrderScreen: React.FC = React.memo(function CheckOrderScreen() {
    return (
        <Wrapper>
            <CheckOrder />
        </Wrapper>
    );
});

export default CheckOrderScreen;
