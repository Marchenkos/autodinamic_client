import { CircularProgress } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';

import { DELIVERY_METHODS, OrderAddressInfo, PAYMENT_METHODS, UserDetailsDataForm } from '../../../../graphql/entities';
import { AppCheckbox } from '../../../../ui/app-checkbox.component';
import { BodyText, TextColor, TextSize, TextWeight } from '../../../../ui/text';
import { getBasket } from '../../basket/selectors';
import { CREATE_ORDER } from '../actions';
import {
    getIsLoadingOrder,
    getOrderUserDetails,
    getOrderDeliveryMethod,
    getOrderDeliveryDetails,
    getOrderPaymentMethod,
} from '../selectors';
import { CompleteOrder } from './complete-order.component';
import { OrderItemDetail } from './order-item-detail.component';
import { PostDeliveryInfo } from './post-delivery-info.component';
import { StyledButton } from '../../../../ui/new-styled';

const LoadingWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
`;

const SectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const OrderDetailsSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 2px #e6e5e5 solid;
    border-top: 2px #e6e5e5 solid;
    padding-bottom: 20px;

    @media (max-width: 850px) {
        flex-direction: column;
        border: none;
        padding-bottom: 0px;
    }
`;

const OrderDetailsSectionItem = styled.div`
    width: 30%;

    @media (max-width: 850px) {
        width: 100%;
        border-bottom: 2px #e6e5e5 solid;
        border-top: 2px #e6e5e5 solid;
        padding-bottom: 20px;
    }
`;

const OrderItemsSection = styled.div`
    width: 100%;
    margin-top: 30px;

    @media (max-width: 850px) {
        margin-top: 50px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const ResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0 15px;
    align-self: flex-end;

    @media (max-width: 850px) {
        align-self: flex-start;
    }
`;

const TotalCostWrapper = styled.div`
    display: flex;
    margin-right: 20px;
    align-items: baseline;
`;

const CheckOrderText = styled(BodyText).attrs({
    color: TextColor.DARK,
    size: TextSize.MEDIUM,
    weight: TextWeight.MEDIUM,
})`
    flex-grow: 1;
    margin: 20px 0;
`;

const LabelText = styled(BodyText).attrs({
    color: TextColor.DARK,
    size: TextSize.EXTRA_SMALL,
    weight: TextWeight.MEDIUM,
})``;

const LabelGrayText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, weight: TextWeight.MEDIUM })`
    margin-right: 10px;
    color: #a2a2a2;
`;

const CostText = styled(BodyText).attrs({ color: TextColor.BLUE, size: TextSize.SMALL, weight: TextWeight.MEDIUM })`
    margin-left: 10px;
`;

const EditableLabel = styled(CheckOrderText)`
    margin-bottom: 15px;
`;

interface OrderDeliveryInfoProps {
    editUserInfo: () => void;
    editDeliveryInfo: () => void;
    editPaymentInfo: () => void;
}

export const ConfirmOrder: React.FC<OrderDeliveryInfoProps> = React.memo(function ConfirmOrder({
    editUserInfo,
    editDeliveryInfo,
    editPaymentInfo,
}: OrderDeliveryInfoProps) {
    const basket = useSelector(getBasket);
    const isLoading = useSelector(getIsLoadingOrder);
    const userDetails = useSelector(getOrderUserDetails);
    const deliveryInfo = useSelector(getOrderDeliveryDetails);
    const deliveryType = useSelector(getOrderDeliveryMethod);
    const paymentType = useSelector(getOrderPaymentMethod);

    const deliveryCost = useMemo(() => (deliveryType === DELIVERY_METHODS.PICKUP ? 0 : 5), [deliveryType]);

    const dispatch = useDispatch();

    if (!userDetails || !deliveryInfo) {
        return <BodyText>Пожалуйста, проверьте введенные данные</BodyText>;
    }

    const handleConfirmOrder = useCallback(() => {
        dispatch(CREATE_ORDER.TRIGGER({ userDetails, deliveryInfo, deliveryType, paymentType }));
    }, [dispatch, userDetails, deliveryInfo, deliveryType]);

    return (
        <Wrapper>
            <CheckOrderText>Пожалуйста, проверьте введенные данные</CheckOrderText>
            <SectionWrapper>
                <OrderDetailsSection>
                    <OrderDetailsSectionItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <EditableLabel>Личная информация</EditableLabel>
                            <EditIcon onClick={editUserInfo} />
                        </div>
                        <LabelText>{`${userDetails.firstName} ${userDetails.lastName}`}</LabelText>
                        <LabelText>{userDetails.phoneNumber}</LabelText>
                        <LabelText>{userDetails.email}</LabelText>
                    </OrderDetailsSectionItem>

                    <OrderDetailsSectionItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <EditableLabel>Способ доставки</EditableLabel>
                            <EditIcon onClick={editDeliveryInfo} />
                        </div>
                        <LabelText>{deliveryType}</LabelText>
                        <LabelText>{`г.${deliveryInfo.city} ${deliveryInfo.address}`}</LabelText>
                        {deliveryType === DELIVERY_METHODS.POST && <LabelText>{deliveryInfo.postcode}</LabelText>}
                    </OrderDetailsSectionItem>

                    <OrderDetailsSectionItem>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <EditableLabel>Способ оплаты</EditableLabel>
                            <EditIcon onClick={editPaymentInfo} />
                        </div>
                        <LabelText>{paymentType}</LabelText>
                    </OrderDetailsSectionItem>
                </OrderDetailsSection>
                <OrderItemsSection>
                    {basket.orderItems.map((item, index) => (
                        <OrderItemDetail product={item} key={index} />
                    ))}
                </OrderItemsSection>
            </SectionWrapper>
            <ResultWrapper>
                <TotalCostWrapper>
                    <LabelText>Стоимость товаров:</LabelText>
                    <CostText>{`${basket.total} BYN`}</CostText>
                </TotalCostWrapper>
                <TotalCostWrapper>
                    <LabelText>Стоимость доставки:</LabelText>
                    <CostText>{`${deliveryCost} BYN`}</CostText>
                </TotalCostWrapper>
                <TotalCostWrapper>
                    <LabelText>Полная стоимость заказа:</LabelText>
                    <CostText>{`${basket.total + deliveryCost} BYN`}</CostText>
                </TotalCostWrapper>
                <StyledButton
                    additionalStyles={{ marginTop: '20px', width: '50%' }}
                    onClick={handleConfirmOrder}
                    label="Подтвердить"
                />
            </ResultWrapper>
            {isLoading && (
                <LoadingWrapper>
                    <CircularProgress style={{ color: '#51acae' }} />
                </LoadingWrapper>
            )}
        </Wrapper>
    );
});
