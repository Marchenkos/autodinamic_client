import React from 'react';
import styled from 'styled-components';

import { CheckOrder } from '../components/order/check-order/check-order.component';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const CheckOrderPage: React.FC = React.memo(function CheckOrderPage() {
    return (
        <Wrapper>
            <CheckOrder />
        </Wrapper>
    );
});

export default CheckOrderPage;
