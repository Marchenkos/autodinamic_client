import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';

import { FormInputText, MobileInput } from '../../../../ui/app-input.component';
import { UserDetailsDataForm } from '../../../../graphql/entities';
import { userDetailsValidationSchema } from '../../../validations/shemes';
import { ErrorLabel } from '../../../validations/error-label.component';
import { BodyText, TextColor, TextSize, TextWeight } from '../../../../ui/text';
import { SET_USER_DETAILS_FOR_ORDER } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderUserDetails } from '../selectors';
import { getUser } from '../../../account/selectors';
import { StyledButton, TextInput } from '../../../../ui/new-styled';

const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 45%;
    margin: 0 auto;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const CheckOrderText = styled(BodyText).attrs({
    color: TextColor.BLUE,
    size: TextSize.MEDIUM,
    weight: TextWeight.MEDIUM,
})`
    margin: 20px 0 15px;
`;

interface OrderUserInfoProps {
    handleNextStep: () => void;
}

export const OrderUserInfo: React.FC<OrderUserInfoProps> = React.memo(function OrderUserInfo({
    handleNextStep,
}: OrderUserInfoProps) {
    const dispatch = useDispatch();
    const currentUser = useSelector(getUser);
    formatPhoneNumberIntl('+375213734253') === '+375 21 373 42 53';

    const { control, handleSubmit, formState, setFocus } = useForm<UserDetailsDataForm>({
        mode: 'onBlur',
    });

    const handleSubmitCallback = useCallback(
        (formInput: UserDetailsDataForm) => {
            dispatch(SET_USER_DETAILS_FOR_ORDER(formInput));
            handleNextStep();
        },
        [handleNextStep, dispatch]
    );

    const userDetails = useSelector(getOrderUserDetails);

    const defaultValues: UserDetailsDataForm = useMemo(() => {
        if (userDetails) {
            return userDetails;
        }

        if (currentUser) {
            return {
                firstName: currentUser.first_name,
                lastName: currentUser.last_name,
                phoneNumber: currentUser.phone_number ? currentUser.phone_number : '',
                email: currentUser.email,
            };
        }

        return {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
        };
    }, [userDetails, currentUser]);

    const isDisableButton = useMemo(() => {
        if (!formState.isSubmitted) {
            return false;
        }

        return !formState.isValid;
    }, [formState.isSubmitted, formState.isValid]);

    const handleSubmitPress = useMemo(() => handleSubmit(handleSubmitCallback), [handleSubmit, handleSubmitCallback]);

    const handleOnPressInter = useCallback(
        (field: string) => {
            if (field === 'lastName' || field === 'email' || field === 'firstName' || field === 'phoneNumber') {
                setFocus(field);
            } else {
                handleSubmitPress();
            }
        },
        [setFocus, handleSubmitPress]
    );

    return (
        <UserInfoWrapper>
            <CheckOrderText>Личная информация</CheckOrderText>

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        nextFieldName="lastName"
                        id="first-name-input"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        placeholder="Имя"
                        withoutBorders
                    />
                )}
                name="firstName"
                rules={{ required: true }}
                defaultValue={defaultValues.firstName}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        nextFieldName="email"
                        id="last-name-input"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        placeholder="Фамилия"
                        withoutBorders
                    />
                )}
                name="lastName"
                rules={{ required: true }}
                defaultValue={defaultValues.lastName}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        id="input-email"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        placeholder="E-mail"
                        withoutBorders
                        nextFieldName="phoneNumber"
                    />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue={defaultValues.email}
            />

            <Controller
                control={control}
                rules={{
                    validate: (value) => isValidPhoneNumber(value),
                }}
                render={({ field, fieldState }) => (
                    <MobileInput
                        {...field}
                        label="Номер телефона"
                        isError={fieldState.error}
                        placeholder="Номер телефона"
                    />
                )}
                name="phoneNumber"
                defaultValue={defaultValues.phoneNumber}
            />

            <StyledButton
                additionalStyles={{ width: '40%', marginTop: '20px', alignSelf: 'flex-end' }}
                onClick={handleSubmitPress}
                disabled={isDisableButton}
                label="Далее"
            />
        </UserInfoWrapper>
    );
});
