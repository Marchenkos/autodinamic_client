import React from 'react';
import styled from 'styled-components';

import { DeliveryDescription } from '../components/delivery/component/delivery-description.component';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const DeliveryPage: React.FC = React.memo(function DeliveryPage() {
    return (
        <Wrapper>
            <DeliveryDescription />
        </Wrapper>
    );
});

export default DeliveryPage;
