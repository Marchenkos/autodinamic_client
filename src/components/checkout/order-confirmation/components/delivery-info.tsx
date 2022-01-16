import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { DELIVERY_METHODS, OrderAddressInfo } from '../../../../graphql/entities';
import { AppCheckbox } from '../../../../ui/app-checkbox.component';
import { BodyText, TextColor, TextSize, TextWeight } from '../../../../ui/text';
import { SET_DELIVERY_DETAILS_FOR_ORDER, SET_DELIVERY_METHOD_FOR_ORDER } from '../actions';
import { getOrderDeliveryMethod } from '../selectors';
import { PickupDeliveryInfo } from './pickup-delivery-info';
import { PostDeliveryInfo } from './post-delivery-info.component';

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

interface OrderDeliveryInfoProps {
    handleBack: () => void;
    handleNextStep: () => void;
}

export const OrderDeliveryInfo: React.FC<OrderDeliveryInfoProps> = React.memo(function OrderDeliveryInfo({
    handleBack,
    handleNextStep,
}: OrderDeliveryInfoProps) {
    const dispatch = useDispatch();
    const deliveryMethod = useSelector(getOrderDeliveryMethod);

    const setDeliveryType = useCallback(
        (type: DELIVERY_METHODS) => {
            dispatch(SET_DELIVERY_METHOD_FOR_ORDER(type));
        },
        [dispatch]
    );

    const handleForm = useCallback(
        (data: OrderAddressInfo) => {
            dispatch(SET_DELIVERY_DETAILS_FOR_ORDER(data));
            handleNextStep();
        },
        [dispatch, handleNextStep]
    );

    const getDeliveryInfo = useMemo(() => {
        if (deliveryMethod === DELIVERY_METHODS.PICKUP) {
            return <PickupDeliveryInfo handleBack={handleBack} handleForm={handleForm} />;
        }

        return <PostDeliveryInfo handleBack={handleBack} handleForm={handleForm} />;
    }, [deliveryMethod, handleForm, handleBack]);

    return (
        <DeliveryInfoWrapper>
            <CheckOrderText>Способ доставки</CheckOrderText>
            <LabelText>Выберите способ получения заказа</LabelText>
            <DeliveryMethodsWrapper>
                <AppCheckbox
                    title={DELIVERY_METHODS.PICKUP}
                    handleChange={() => setDeliveryType(DELIVERY_METHODS.PICKUP)}
                    isSelected={deliveryMethod === DELIVERY_METHODS.PICKUP}
                />
                <AppCheckbox
                    title={DELIVERY_METHODS.POST}
                    handleChange={() => setDeliveryType(DELIVERY_METHODS.POST)}
                    isSelected={deliveryMethod === DELIVERY_METHODS.POST}
                />
            </DeliveryMethodsWrapper>
            {getDeliveryInfo}
        </DeliveryInfoWrapper>
    );
});
