import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { DELIVERY_METHODS, PAYMENT_METHODS } from '../../../../graphql/entities';
import { AppCheckbox } from '../../../../ui/app-checkbox.component';
import { StyledButton } from '../../../../ui/new-styled';
import { BodyText, TextColor, TextSize, TextWeight } from '../../../../ui/text';
import { SET_PAYMENT_DETAILS_FOR_ORDER } from '../actions';
import { getOrderDeliveryMethod, getOrderPaymentMethod } from '../selectors';
import { OrderButtonWrapper } from './pickup-delivery-info';

const DeliveryInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 45%;
    margin: 0 auto;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const DeliveryMethodsWrapper = styled.div`
    margin-bottom: 15px;
`;

const CheckOrderText = styled(BodyText).attrs({
    color: TextColor.BLUE,
    size: TextSize.MEDIUM,
    weight: TextWeight.MEDIUM,
})`
    margin: 20px 0 15px;
`;

const LabelText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.EXTRA_SMALL })`
    margin: 0px 0 10px;
`;

interface OrderPaymentInfoProps {
    handleBack: () => void;
    handleNextStep: () => void;
}

export const OrderPaymentInfo: React.FC<OrderPaymentInfoProps> = React.memo(function OrderDeliveryInfo({
    handleBack,
    handleNextStep,
}: OrderPaymentInfoProps) {
    const dispatch = useDispatch();
    const deliveryMethod = useSelector(getOrderDeliveryMethod);
    const paymentType = useSelector(getOrderPaymentMethod);

    useEffect(() => {
        if (deliveryMethod === DELIVERY_METHODS.POST) {
            handleNextStep();
        }
    }, [deliveryMethod]);

    const setPaymentType = useCallback(
        (type: PAYMENT_METHODS) => {
            dispatch(SET_PAYMENT_DETAILS_FOR_ORDER(type));
        },
        [dispatch]
    );

    return (
        <DeliveryInfoWrapper>
            <CheckOrderText>Способ оплаты</CheckOrderText>
            <LabelText>Выберите способ оплаты заказа</LabelText>
            <DeliveryMethodsWrapper>
                <AppCheckbox
                    title={PAYMENT_METHODS.CASH}
                    handleChange={() => setPaymentType(PAYMENT_METHODS.CASH)}
                    isSelected={paymentType === PAYMENT_METHODS.CASH}
                />
                <AppCheckbox
                    title={PAYMENT_METHODS.CART}
                    handleChange={() => setPaymentType(PAYMENT_METHODS.CART)}
                    isSelected={paymentType === PAYMENT_METHODS.CART}
                />
            </DeliveryMethodsWrapper>

            <OrderButtonWrapper>
                <StyledButton isSecondary additionalStyles={{ width: '25%' }} onClick={handleBack} label="Назад" />
                <StyledButton additionalStyles={{ width: '25%' }} onClick={handleNextStep} label="Далее" />
            </OrderButtonWrapper>
        </DeliveryInfoWrapper>
    );
});
