import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import { DELIVERY_METHODS, OrderAddressInfo } from '../../../../graphql/entities';
import { AppCheckbox } from '../../../../ui/app-checkbox.component';
import { StyledButton } from '../../../../ui/new-styled';
import { BodyText, TextColor, TextSize, TextWeight } from '../../../../ui/text';
import { PostDeliveryInfo } from './post-delivery-info.component';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

export const OrderButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const LabelText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.SMALL })`
    margin: 0px 0 10px;
`;

const AddressText = styled(BodyText).attrs({ color: TextColor.BLUE, size: TextSize.SMALL, weight: TextWeight.MEDIUM })`
    margin: 0 0 10px 10px;
`;

interface OrderDeliveryInfoProps {
    handleForm: (data: OrderAddressInfo) => void;
    handleBack: () => void;
}

export const PickupDeliveryInfo: React.FC<OrderDeliveryInfoProps> = React.memo(function PickupDeliveryInfo({
    handleBack,
    handleForm,
}: OrderDeliveryInfoProps) {
    const pickUpAddress: OrderAddressInfo = {
        address: 'ул. Карповича, 28',
        city: 'Гомель',
        postcode: '11111',
    };

    const handleNext = useCallback(() => {
        handleForm(pickUpAddress);
    }, [pickUpAddress, handleForm]);

    return (
        <Wrapper>
            <div style={{ display: 'flex' }}>
                <LabelText>Заказ будет доступен по адресу:</LabelText>
                <AddressText>{`г. ${pickUpAddress.city} ${pickUpAddress.address}`}</AddressText>
            </div>
            <div style={{ display: 'flex' }}>
                <LabelText>Стоимость доставки - </LabelText>
                <AddressText>Бесплатно</AddressText>
            </div>
            <OrderButtonWrapper>
                <StyledButton isSecondary onClick={handleBack} additionalStyles={{ width: '25%' }} label="Назад" />
                <StyledButton additionalStyles={{ width: '25%' }} onClick={handleNext} label="Далее" />
            </OrderButtonWrapper>
        </Wrapper>
    );
});
