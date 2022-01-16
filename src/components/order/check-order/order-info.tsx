import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Order, DELIVERY_METHODS } from '../../../graphql/entities';
import { TitleText, TextSize, TextColor, BodyText, TextWeight } from '../../../ui/text';
import { OrderStepper } from '../../account/component/orders/components/order-stepper.component';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
`;

const OrderItemWrapper = styled.div`
    margin: 50px auto 0;
    width: 70%;
    padding: 15px;
    align-items: center;
`;

const MoreDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 50px;
`;

const MoreDetailsDescription = styled.div`
    margin-bottom: 50px;
`;

const MoreDetailsStatus = styled.div`
    width: 50%;
`;

const Separator = styled.div`
    border-top: 1px solid white;
    width: 50%;
`;

const NameText = styled(TitleText).attrs({ size: TextSize.MEDIUM, color: TextColor.DARK })`
    margin-bottom: 15px;
    min-width: 220px;
    flex-grow: 1;
`;

const ValueText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.EXTRA_LIGHT })`
    margin-bottom: 0px;
    margin-right: 10px;
`;

const LabelText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.SMALL, weight: TextWeight.MEDIUM })``;

const LabelGrayText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, weight: TextWeight.MEDIUM })`
    margin-right: 10px;
    color: #3e6969;
`;

interface OrderItemProps {
    order: Order;
}

export const OrderInfo: React.FC<OrderItemProps> = React.memo(function OrderInfo({ order }: OrderItemProps) {
    const deliveryTypeName = useMemo(
        () => (order.deliveryType === DELIVERY_METHODS.POST ? 'Почтой' : 'Самовывоз'),
        [order.deliveryType]
    );

    return (
        <OrderItemWrapper>
            <NameText>{`Заказ № ${order.orderId}`}</NameText>

            <MoreDetails>
                <MoreDetailsStatus>
                    <NameText>История заказа</NameText>
                    <OrderStepper
                        currentStep={order.currentStep}
                        currentStepDate={order.stepDate[order.stepDate.length - 1]}
                    />
                </MoreDetailsStatus>
                <div>
                    <MoreDetailsDescription>
                        <NameText>Способ доставки</NameText>
                        <Wrapper>
                            <LabelGrayText>Тип доставки:</LabelGrayText>
                            <LabelText>{deliveryTypeName}</LabelText>
                        </Wrapper>
                        <Wrapper>
                            <LabelGrayText>Адрес доставки:</LabelGrayText>
                            <LabelText>{`г.${order.address.city} ${order.address.address}`}</LabelText>
                        </Wrapper>
                        <Wrapper>
                            <LabelGrayText>Стоимость доставки:</LabelGrayText>
                            <LabelText>{`${order.deliveryCost} BYN`}</LabelText>
                        </Wrapper>
                    </MoreDetailsDescription>
                    <MoreDetailsDescription>
                        <NameText>Личная информация</NameText>
                        <Wrapper>
                            <LabelGrayText>Имя, фамилия:</LabelGrayText>
                            <LabelText>{`${order.userDetails.firstName} ${order.userDetails.lastName}`}</LabelText>
                        </Wrapper>
                        <Wrapper>
                            <LabelGrayText>Номер телефона:</LabelGrayText>
                            <LabelText>{order.userDetails.phoneNumber}</LabelText>
                        </Wrapper>
                        <Wrapper>
                            <LabelGrayText>Электронная почта:</LabelGrayText>
                            <LabelText>{order.userEmail}</LabelText>
                        </Wrapper>
                    </MoreDetailsDescription>
                </div>
            </MoreDetails>
        </OrderItemWrapper>
    );
});
