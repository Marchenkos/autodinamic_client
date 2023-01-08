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

const InfoSection = styled.div`
    display: flex;
    width: 100%;

    @media (max-width: 850px) {
        justify-content: space-between;
        margin-bottom: 10px;
    }
`;

export const OrderButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const LabelText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.SMALL })`
    margin: 0px 0 10px;

    @media (max-width: 850px) {
        font-size: 11px;
        margin: 0;
    }
`;

const AddressText = styled(BodyText).attrs({ color: TextColor.BLUE, size: TextSize.SMALL, weight: TextWeight.MEDIUM })`
    margin: 0 0 10px 10px;

    @media (max-width: 850px) {
        font-size: 12px;
        margin: 0;
    }
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
            <InfoSection>
                <LabelText>Наш адрес:</LabelText>
                <AddressText>{`г. ${pickUpAddress.city} ${pickUpAddress.address}`}</AddressText>
            </InfoSection>
            <InfoSection>
                <LabelText>Стоимость доставки:</LabelText>
                <AddressText>Бесплатно</AddressText>
            </InfoSection>
            <OrderButtonWrapper>
                <StyledButton isSecondary onClick={handleBack} additionalStyles={{ width: '25%' }} label="Назад" />
                <StyledButton additionalStyles={{ width: '25%' }} onClick={handleNext} label="Далее" />
            </OrderButtonWrapper>
        </Wrapper>
    );
});
