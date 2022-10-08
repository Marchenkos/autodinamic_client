import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { TitleText, BodyText, TextSize, TextWeight, TextColor } from '../../../ui/text';
import { BasketItem } from './components/basket-item.component';
import { LocaleStrings } from '../../../locale';
import { device } from '../../../../public/screen-sizes';
import { useSelector } from 'react-redux';
import { getBasket, getBasketItemsCount } from './selectors';
import { Button } from '@material-ui/core';
import { isTemplateTail } from 'typescript';
import { StyledButton } from '../../../ui/new-styled';

const BasketWrapper = styled.div`
    padding: 20px 50px;
`;

const BasketBodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 85vh;

    flex-direction: row;

    @media ${device.laptop} {
        flex-direction: column;
    }
`;
const BasketItems = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 50px;

    @media ${device.laptop} {
        margin-right: 0;
    }
`;

const ResultBasketWrapper = styled.div`
    width: 50%;
    min-width: 300px;
    padding: 20px;
    border: 2px solid #f2f2f2;
    margin-top: 0px;
    height: 270px;

    @media ${device.laptop} {
        margin-top: 40px;
        width: 40%;
    }
`;

const ResultItemWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: ${(props: { first?: boolean }) => (props.first ? '25px' : '0')};
`;

const ResultItemButtonWrapper = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
`;

const BasketHeaders = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 1.5px solid #e8e8e8;
`;

const BasketBodyText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    margin-right: 5px;
`;

const HeaderWrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 20px 0;
`;

export const Basket: React.FC = React.memo(function Basket() {
    const basket = useSelector(getBasket);
    const history = useHistory();

    const countItems = useMemo(() => {
        let count = 0;

        basket.orderItems.map((item) => {
            count = count + item.count;
        });

        return count;
    }, [basket.orderItems]);

    const continueShoppingHandle = useCallback(() => {
        history.push('/catalog/all');
    }, [history]);

    const goToOrderConfirmation = useCallback(() => {
        history.push('/order-confirmation');
    }, [history]);

    return (
        <BasketWrapper>
            <HeaderWrapper>
                <TitleText>Корзина</TitleText>
            </HeaderWrapper>
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
