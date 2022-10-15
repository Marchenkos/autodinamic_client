import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Order } from '../../../../../graphql/entities';
import { Button } from '@material-ui/core';
import { ProductCarousel } from '../../../../home/home.screen';
import { TitleText, TextSize, TextColor, TextWeight, BodyText } from '../../../../../ui/text';
import { getSteps } from './order-stepper.component';
import { NULLABLE_IMAGE } from '../../../../product-details/components/product-detail-image.component';
import { StyledButton } from '../../../../../ui/new-styled';

const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
`;

const OrderItemWrapper = styled.div`
    margin: 40px 0 20px;
`;

const StatusWrapper = styled.div`
    flex-grow: 1;
`;

const NameText = styled(TitleText).attrs({ size: TextSize.SMALL, color: TextColor.MEDIUM })`
    margin-bottom: 15px;
    font-weight: 500;
`;

const PriceText = styled(TitleText).attrs({ size: TextSize.SMALL, color: TextColor.DARK })`
    margin-top: 25px;
    font-weight: 500;
`;

const StatusText = styled(TitleText).attrs({
    size: TextSize.MEDIUM,
    color: TextColor.DARK,
    weight: TextWeight.DEFAULT,
})`
    margin-bottom: 5px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-right: 30px;
    width: 20%;
    align-items: flex-start;
`;

const ProductImage = styled.img`
    max-width: 10%;
    margin-right: 20px;
    height: auto;
`;

export const OrderSeparator = styled.div`
    width: 107%;
    height: 10px;
    background: #f4f5f7;
    margin-left: -30px;
`;

interface OrderItemProps {
    order: Order;
}

export const OrderItem: React.FC<OrderItemProps> = React.memo(function OrderItem({ order }: OrderItemProps) {
    const history = useNavigate();
    const steps = getSteps();

    const goToOrderDetails = useCallback(() => {
        history(`/account/order-details/${order.orderId}`);
    }, [order, history]);

    return (
        <>
            <OrderSeparator />
            <OrderItemWrapper>
                <HeaderWrapper>
                    <StatusWrapper>
                        <StatusText>{`Статус заказа: ${steps[order.stepDate.length]}`}</StatusText>
                        <NameText>{`Номер заказа: ${order.orderId}`}</NameText>
                    </StatusWrapper>
                    <ButtonWrapper>
                        <StyledButton onClick={goToOrderDetails} label="Подробнее" />
                    </ButtonWrapper>
                </HeaderWrapper>
                <ProductCarousel>
                    {order.productItems.map((item) => (
                        <ProductImage key={item.id} src={item.images ? item.images[0].displayUrl : NULLABLE_IMAGE} />
                    ))}
                </ProductCarousel>
                <PriceText>{`Полная стоимость: ${order.total} BYN`}</PriceText>
            </OrderItemWrapper>
        </>
    );
});
