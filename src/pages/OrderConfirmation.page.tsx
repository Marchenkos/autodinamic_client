import React from 'react';
import styled from 'styled-components';

import { OrderConfirmation } from '../components/checkout/order-confirmation/order-confirmation.component';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const OrderConfirmationPage: React.FC = React.memo(function OrderConfirmationPage() {
    return (
        <Wrapper>
            <OrderConfirmation />
        </Wrapper>
    );
});

export default OrderConfirmationPage;
