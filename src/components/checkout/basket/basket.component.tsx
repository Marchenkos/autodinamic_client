import React, { useCallback, useMemo } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { TitleText, BodyText, TextSize, TextWeight } from '../../../ui/text';
import { BasketItem } from './components/basket-item.component';
import { LocaleStrings } from '../../../locale';
import { useSelector } from 'react-redux';
import { getBasket } from './selectors';
import { StyledButton } from '../../../ui/new-styled';

import { BasketWrapper, BasketBodyText, BasketHeaderWrapper, BasketBodyWrapper, BasketItems, BasketHeaders, ResultBasketWrapper, ResultItemWrapper, ResultItemButtonWrapper } from './basket.styled';

export const Basket: React.FC = React.memo(function Basket() {
    const basket = useSelector(getBasket);
    const navigate = useNavigate();

    const countItems = useMemo(() => {
        let count = 0;

        basket.orderItems.map((item) => {
            count = count + item.count;
        });

        return count;
    }, [basket.orderItems]);

    const continueShoppingHandle = useCallback(() => {
      navigate({
        pathname: "catalog",
        search: `?${createSearchParams({
          category: "all"
        })}`
      });
    }, [navigate]);

    const goToOrderConfirmation = useCallback(() => {
      navigate('/order-confirmation');
    }, [navigate]);

    return (
      <BasketWrapper>
        <BasketHeaderWrapper>
            <TitleText>Корзина</TitleText>
        </BasketHeaderWrapper>
        <BasketBodyWrapper>
            <BasketItems>
                <BasketHeaders>
                    <BodyText size={TextSize.EXTRA_SMALL} weight={TextWeight.DEFAULT} style={{ width: '50%' }}>
                        товар
                    </BodyText>
                    <BodyText size={TextSize.EXTRA_SMALL} weight={TextWeight.DEFAULT}>
                        количество
                    </BodyText>
                    <BodyText
                        size={TextSize.EXTRA_SMALL}
                        weight={TextWeight.DEFAULT}
                        style={{ width: '18%', marginLeft: '-100px' }}
                    >
                        стоимость
                    </BodyText>
                </BasketHeaders>
                {basket.orderItems.map((item, index) => (
                    <BasketItem key={index} product={item} />
                ))}
            </BasketItems>
            <ResultBasketWrapper>
                <TitleText>{LocaleStrings.checkout.basket.resultCard.resultHeader}</TitleText>
                <ResultItemWrapper first>
                    <BasketBodyText>{LocaleStrings.checkout.basket.resultLabels.quantity}</BasketBodyText>
                    <BasketBodyText>{countItems}</BasketBodyText>
                </ResultItemWrapper>
                <ResultItemWrapper>
                    <BasketBodyText>{LocaleStrings.checkout.basket.resultLabels.totalPrice}</BasketBodyText>
                    <BasketBodyText>{`${basket.total} BYN`}</BasketBodyText>
                </ResultItemWrapper>
                <ResultItemButtonWrapper>
                    <StyledButton onClick={continueShoppingHandle} label="Продолжить покупки" />
                    <StyledButton
                        additionalStyles={{ marginTop: '10px' }}
                        onClick={goToOrderConfirmation}
                        label="Офромить заказ"
                    />
                </ResultItemButtonWrapper>
            </ResultBasketWrapper>
        </BasketBodyWrapper>
      </BasketWrapper>
    );
});
