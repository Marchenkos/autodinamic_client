import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Basket } from '../basket/basket.component';
import { EmptyBasket } from '../basket/components/empty-basket.component';
import { getBasketItemsCount } from '../basket/selectors';
import { getDeviceSize } from '../../../utils/check-device-size';
import { MobileBasket } from '../basket/mobile-basket.component';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const BasketScreen: React.FC = React.memo(function BasketScreen() {
    const basketItemCount = useSelector(getBasketItemsCount);
    const deviceSize = getDeviceSize();

    if (deviceSize < 810) {
        return <Wrapper>{basketItemCount ? <MobileBasket /> : <EmptyBasket />}</Wrapper>;
    }

    return <Wrapper>{basketItemCount ? <Basket /> : <EmptyBasket />}</Wrapper>;
});

export default BasketScreen;
