import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { TitleText, BodyText, TextSize, TextWeight, TextColor } from '../../../ui/text';
import { BasketItem } from './components/basket-item.component';
import { device } from '../../../../public/screen-sizes';
import { useSelector } from 'react-redux';
import { getBasket, getBasketItemsCount } from './selectors';
import { Button } from '@material-ui/core';
import { isTemplateTail } from 'typescript';
import { MobileBasketItem } from './components/mobile-basket-item.component';
import { StyledButton } from '../../../ui/new-styled';

const BasketWrapper = styled.div`
    width: 85%;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    min-height: 85vh;
    align-items: center;
    flex-grow: 1;
    background: white;

    @media ${device.laptop} {
        flex-direction: column;
    }
`;

const BasketItems = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 100px;

    @media ${device.laptop} {
        margin-right: 0;
    }
`;

const ResultBasketWrapper = styled.div`
    width: 100%;
    align-self: center;
    flex-grow: 1;
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
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
    margin-top: 10px;
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

const BasketHeaderText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.DARK })`
    width: 60%;
    text-align: center;
    margin-bottom: 20px;
`;

export const MobileBasket: React.FC = React.memo(function MobileBasket() {
    const basket = useSelector(getBasket);
    const navigate = useNavigate();

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
          <BasketHeaderText>{basket.orderItems.length} товар</BasketHeaderText>
          <BasketItems>
              {basket.orderItems.map((item, index) => (
                  <MobileBasketItem key={index} product={item} />
              ))}
          </BasketItems>
          <ResultBasketWrapper>
              <ResultItemWrapper>
                  <BasketBodyText>Общая стоимость:</BasketBodyText>
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
      </BasketWrapper>
    );
});
