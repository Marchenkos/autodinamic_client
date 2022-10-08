import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { AddressInfo } from '../../../../../graphql/entities';
import { AppCheckbox } from '../../../../../ui/app-checkbox.component';
import { TitleText, TextSize, BodyText, TextWeight } from '../../../../../ui/text';
import { SHOW_TOAST } from '../../../../toast/actions';
import { REMOVE_ADDRESS, SET_DEFAULT_ADDRESS } from '../../../actions';
import { HIDE_FORM_MODAL, SHOW_FORM_MODAL } from '../../../../modal/actions';
import { EditDeliveryInfo } from './edit-address-details.component';
import { OrderSeparator } from '../../orders/components/order-item.component';
import { TOGGLE_DRAWER } from '../../../../drawer/actions';

const NameText = styled(TitleText).attrs({ size: TextSize.SMALL })`
    margin-bottom: 5px;

    @media (max-width: 850px) {
        font-size: 12px;
    }
`;

const ValueText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    margin-bottom: 5px;

    @media (max-width: 850px) {
        font-size: 13px;
    }
`;

const ChangeText = styled(BodyText).attrs({ size: TextSize.SMALL, weight: TextWeight.MEDIUM })`
    margin-right: 10px;
    color: #328282;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        color: #48b3b3;
    }
`;

const AddressWrapper = styled.div`
    min-width: 50%;
    max-width: 70%;
    padding: 20px;
    margin: 5px 0;

    @media (max-width: 850px) {
        min-width: 50%;
        max-width: 100%;
        padding: 20px 0;
        margin: 0;
    }
`;

const Section = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const ButtomWrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 2px 0;
    justify-content: flex-end;
    margin-top: -24px;
`;

interface AddressListDetailsProps {
    address: AddressInfo;
}

export const AddressListDetails: React.FC<AddressListDetailsProps> = React.memo(function AddressList({
    address,
}: AddressListDetailsProps) {
    const dispatch = useDispatch();

    const handleCloseModal = useCallback(() => {
        dispatch(HIDE_FORM_MODAL());
    }, [dispatch]);

    const handleOpenModal = useCallback(() => {
        dispatch(
            TOGGLE_DRAWER({
                children: <EditDeliveryInfo handleCloseModal={handleCloseModal} address={address} />,
                isShow: true,
            })
        );
    }, [dispatch, handleCloseModal, address]);

    const toggleAddress = useCallback(() => {
        if (address.isDefault) {
            dispatch(
                SHOW_TOAST({ message: 'Чтобы выполнить действие, назначте другой адрес по умолчанию', status: 'error' })
            );
        } else {
            dispatch(SET_DEFAULT_ADDRESS.TRIGGER(address.id));
        }
    }, [dispatch, address]);

    const removeAddress = useCallback(() => {
        if (address.isDefault) {
            dispatch(
                SHOW_TOAST({ message: 'Чтобы выполнить действие, назначте другой адрес по умолчанию', status: 'error' })
            );
        } else {
            dispatch(REMOVE_ADDRESS.TRIGGER(address.id));
        }
    }, [dispatch, address]);

    return (
        <>
            <OrderSeparator />
            <AddressWrapper>
                <Section>
                    <NameText>Город</NameText>
                    <ValueText>{address.city}</ValueText>
                </Section>
                <Section>
                    <NameText>Адрес</NameText>
                    <ValueText>{address.address}</ValueText>
                </Section>
                <Section>
                    <NameText>Почтовый индекс</NameText>
                    <ValueText>{address.postcode}</ValueText>
                </Section>
                <AppCheckbox
                    title="Использовать по умолчанию"
                    handleChange={toggleAddress}
                    isSelected={address.isDefault}
                />
                <ButtomWrapper>
                    <ChangeText onClick={handleOpenModal}>Изменить</ChangeText>
                    <span
                        style={{ fontSize: '22px', cursor: 'pointer' }}
                        className="icon-delete"
                        onClick={removeAddress}
                    ></span>
                </ButtomWrapper>
            </AddressWrapper>
        </>
    );
});
