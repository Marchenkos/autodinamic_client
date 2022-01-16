import React from 'react';
import styled from 'styled-components';

import { OrderConfirmation } from '../order-confirmation/order-confirmation.component';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const OrderConfirmationScreen: React.FC = React.memo(function OrderConfirmationScreen() {
    return (
        <Wrapper>
            <OrderConfirmation />
        </Wrapper>
    );
});

export default OrderConfirmationScreen;
