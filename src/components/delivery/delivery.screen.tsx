import React from 'react';
import styled from 'styled-components';

import { DeliveryDescription } from './component/delivery-description.component';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const DeliveryScreen: React.FC = React.memo(function DeliveryScreen() {
    return (
        <Wrapper>
            <DeliveryDescription />
        </Wrapper>
    );
});

export default DeliveryScreen;
