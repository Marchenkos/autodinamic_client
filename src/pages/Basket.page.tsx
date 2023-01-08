import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  createSearchParams, useNavigate } from 'react-router-dom';

import { Basket } from '../components/checkout/basket/basket.component';
import { getBasketItemsCount } from '../components/checkout/basket/selectors';
import { getDeviceSize } from '../utils/check-device-size';
import { MobileBasket } from '../components/checkout/basket/mobile-basket.component';

const BasketPage: React.FC = React.memo(function BasketPage() {
    const basketItemCount = useSelector(getBasketItemsCount);
    const deviceSize = getDeviceSize();
    const navigate = useNavigate();

    useEffect(() => {
      if (basketItemCount === 0) {
        navigate({
          pathname: "/catalog",
          search: `?${createSearchParams({
            category: "all"
          })}`
        });
      }
    }, [basketItemCount]);

    if (deviceSize < 810) {
      return <MobileBasket />;
    }

    return <Basket />;
});

export default BasketPage;
