import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BodyText, TextSize, TextColor, TextWeight } from '../../../../ui/text';
import { OrderAddressInfo } from '../../../../graphql/entities';
import { OrderButtonWrapper } from './pickup-delivery-info';
import { userAddressValidationSchema } from '../../../validations/shemes';
import { useSelector } from 'react-redux';
import { getOrderDeliveryDetails } from '../selectors';
import { getPrimaryAddress } from '../../../account/selectors';
import { StyledButton, TextInput } from '../../../../ui/new-styled';

const PostInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const LabelText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.SMALL })`
    margin: 0px 0 10px;
`;

const AddressText = styled(BodyText).attrs({ color: TextColor.BLUE, size: TextSize.SMALL, weight: TextWeight.MEDIUM })`
    margin: 0 0 10px 10px;
`;

interface PostDeliveryInfoProps {
    handleForm: (data: OrderAddressInfo) => void;
    handleBack: () => void;
}

export const PostDeliveryInfo: React.FC<PostDeliveryInfoProps> = React.memo(function PostDeliveryInfo({
    handleForm,
    handleBack,
}: PostDeliveryInfoProps) {
    const { control, handleSubmit, formState, setFocus } = useForm<OrderAddressInfo>({
        mode: 'onBlur',
        resolver: yupResolver(userAddressValidationSchema),
    });
    const primaryAddressData = useSelector(getPrimaryAddress);
    const deliveryInfo = useSelector(getOrderDeliveryDetails);

    const defaultValues: OrderAddressInfo = useMemo(() => {
        if (deliveryInfo) {
            return deliveryInfo;
        }

        if (primaryAddressData) {
            return {
                address: primaryAddressData.address,
                city: primaryAddressData.city,
                postcode: primaryAddressData.postcode,
            };
        }

        return {
            address: '',
            city: '',
            postcode: '',
        };
    }, [deliveryInfo, primaryAddressData]);

    const handleSubmitCallback = useCallback(
        (formInput: OrderAddressInfo) => {
            handleForm(formInput);
        },
        [handleForm]
    );

    const isDisableButton = useMemo(() => {
        if (!formState.isSubmitted) {
            return false;
        }

        return !formState.isValid;
    }, [formState.isSubmitted, formState.isValid]);

    const handleSubmitPress = useMemo(() => handleSubmit(handleSubmitCallback), [handleSubmit, handleSubmitCallback]);

    const handleOnPressInter = useCallback(
        (field: string) => {
            if (field === 'city' || field === 'address' || field === 'postcode') {
                setFocus(field);
            } else {
                handleSubmitPress();
            }
        },
        [setFocus, handleSubmitPress]
    );

    return (
        <PostInfoWrapper>
            <div style={{ display: 'flex' }}>
                <LabelText>Стоимость доставки - </LabelText>
                <AddressText>5 BYN</AddressText>
            </div>

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        nextFieldName="address"
                        id="oreder-input-city"
                        isError={fieldState.error}
                        placeholder="Город"
                        onPressInter={handleOnPressInter}
                    />
                )}
                name="city"
                defaultValue={defaultValues.city}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        placeholder="Адрес"
                        nextFieldName="postcode"
                        id="oreder-input-address"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                    />
                )}
                name="address"
                defaultValue={defaultValues.address}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        placeholder="Почтовый индекс"
                        nextFieldName=""
                        id="oreder-input-postcode"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                    />
                )}
                name="postcode"
                defaultValue={defaultValues.postcode}
            />

            <OrderButtonWrapper>
                <StyledButton isSecondary additionalStyles={{ width: '25%' }} onClick={handleBack} label="Назад" />
                <StyledButton
                    additionalStyles={{ width: '25%' }}
                    onClick={handleSubmitPress}
                    disabled={isDisableButton}
                    label="Далее"
                />
            </OrderButtonWrapper>
        </PostInfoWrapper>
    );
});
