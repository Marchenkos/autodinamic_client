import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {  useNavigate } from 'react-router-dom';

import { Basket } from '../basket/basket.component';
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
    const history = useNavigate();

    useEffect(() => {
        if (basketItemCount === 0) {
            history('/catalog/all');
        }
    }, [basketItemCount]);

    if (deviceSize < 810) {
        return (
            <Wrapper>
                <MobileBasket />
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Basket />
        </Wrapper>
    );
});

export default BasketScreen;
