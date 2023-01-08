import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { AddressInfo } from '../../../../../graphql/entities';
import { AppSelector } from '../../../../../ui/app-selector.component';
import { TitleText, TextSize } from '../../../../../ui/text';
import { selectorAddresses } from '../../../../INFO/post-addresses';
import { userAddressValidationSchema } from '../../../../validations/shemes';
import { ADD_DELIVERY_ADDRESS, EDIT_DELIVERY_ADDRESS } from '../../../actions';
import { getUserAddresses } from '../../../selectors';
import { StyledButton, TextInput } from '../../../../../ui/new-styled';

const Wrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 100px 30px 0;
    flex-direction: column;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin: 20px 0 0;
`;

const FormTitle = styled(TitleText).attrs({ size: TextSize.LARGE })`
    margin-bottom: 25px;
    color: #656262;
    font-weight: 400;
`;

interface EditDeliveryInfoProps {
    address?: AddressInfo;
    handleCloseModal: () => void;
}

interface EditAddressFormData {
    postcode: string;
    city: string;
    address: string;
}

export const EditDeliveryInfo: React.FC<EditDeliveryInfoProps> = React.memo(function EditUserDetails({
    address,
    handleCloseModal,
}: EditDeliveryInfoProps) {
    const { control, handleSubmit, formState, setFocus } = useForm<EditAddressFormData>({
        mode: 'onBlur',
        resolver: yupResolver(userAddressValidationSchema),
    });
    const dispatch = useDispatch();
    const userAddressInfo = useSelector(getUserAddresses);

    const userInfo = address
        ? address
        : {
              address: '',
              postcode: '',
              city: '',
          };

    const handleSubmitCallback = useCallback(
        (formInput: EditAddressFormData) => {
            if (!address) {
                const setIsDefault = userAddressInfo ? false : true;

                dispatch(ADD_DELIVERY_ADDRESS.TRIGGER({ ...formInput, isDefault: setIsDefault }));
            } else {
                dispatch(EDIT_DELIVERY_ADDRESS.TRIGGER({ ...formInput, isDefault: address.isDefault, id: address.id }));
            }

            handleCloseModal();
        },
        [address, userAddressInfo, handleCloseModal]
    );

    const handleSubmitPress = useMemo(() => handleSubmit(handleSubmitCallback), [handleSubmit, handleSubmitCallback]);

    const isDisableButton = useMemo(() => {
        if (!formState.isSubmitted) {
            return false;
        }

        return !formState.isValid;
    }, [formState.isSubmitted, formState.isValid]);

    const handleOnPressInter = useCallback(
        (field: string) => {
            if (field === 'postcode' || field === 'address' || field === 'city') {
                setFocus(field);
            } else {
                handleSubmitPress();
            }
        },
        [setFocus, handleSubmitPress]
    );

    return (
        <Wrapper>
            <FormTitle>{address ? 'Изменить адресс' : 'Добавить адресс'}</FormTitle>
            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <AppSelector
                        {...field}
                        isError={fieldState.error}
                        label="Город*"
                        items={selectorAddresses}
                        placeholder={''}
                    />
                )}
                name="city"
                defaultValue={
                    selectorAddresses.indexOf(userInfo.city) != -1
                        ? selectorAddresses[selectorAddresses.indexOf(userInfo.city)]
                        : ''
                }
            />

            <Controller
                control={control}
                name="address"
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        nextFieldName="postcode"
                        id="edit-address-address"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        placeholder="Адрес"
                    />
                )}
                defaultValue={userInfo.address}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        placeholder="Почтовый индекс"
                        nextFieldName=""
                        id="edit-address-postcode"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                    />
                )}
                name="postcode"
                defaultValue={userInfo.postcode}
            />
            <ButtonWrapper>
                <StyledButton
                    additionalStyles={{ width: '200px' }}
                    label="Сохранить"
                    onClick={handleSubmitPress}
                    disabled={isDisableButton}
                />
            </ButtonWrapper>
        </Wrapper>
    );
});
