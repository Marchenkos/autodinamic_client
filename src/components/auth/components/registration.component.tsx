import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { CLEAR_REGISTRATiON_ERROR, REGISTRATION } from '../actions';
import { getRegisterError } from '../selectors';
import { registrationValidationSchema } from '../../validations/shemes';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledButton, TextInput, PasswordTextInput } from '../../../ui/new-styled';
import { RegisterErrorType } from '../sagas/registration.saga';
import { TitleText } from '../../../ui/text';

const PageTitleText = styled(TitleText)`
    font-size: 27px;
    margin: 0 auto 27px;
`;

const RegistrationWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 60%;
    box-sizing: border-box;
    padding: 20px 0;
    margin: 0 auto;

    @media (max-width: 850px) {
        padding: 10px 0;
        width: 70%;
    }

    @media (max-width: 450px) {
        width: 90%;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    margin: 20px 0 0;
    display: flex;
    justify-content: center;

    @media (max-width: 850px) {
        margin: 10px 0 0;
    }

    @media (max-width: 450px) {
        flex-direction: column;
        margin: 30px 0 0;
        min-height: 90px;
    }
`;

const SmallButton = styled.div`
    margin: 10px 0 0;
    color: #6a8681;
    font-family: 'Manrope';
    font-size: 15px;
    cursor: pointer;
`;

export interface RegistrationData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Registration: React.FC = React.memo(function Registration() {
    const dispatch = useDispatch();
    const registrationError = useSelector(getRegisterError);

    const { control, handleSubmit, formState, setFocus, watch, setError, clearErrors } = useForm<RegistrationData>({
        mode: 'onBlur',
        resolver: yupResolver(registrationValidationSchema),
    });

    const emailValue = watch('email');

    const isDuplicateEmailErrorExist = useMemo(
        () => !!registrationError && registrationError.type === RegisterErrorType.DUPLICATE_EMAIL,
        [registrationError]
    );

    useEffect(() => {
        if (isDuplicateEmailErrorExist) {
            if (registrationError && emailValue === registrationError.email) {
                setError('email', {
                    type: 'manual',
                    message: 'Уже существует аккаунт с таким E-mail',
                });
                setFocus('email');
            } else {
                clearErrors('email');
                dispatch(CLEAR_REGISTRATiON_ERROR());
            }
        }
    }, [emailValue, registrationError, clearErrors, setError, dispatch, isDuplicateEmailErrorExist, setFocus]);

    const handleSubmitCallback = useCallback(
        (inputData: RegistrationData) => {
            const { confirmPassword, ...other } = inputData;

            dispatch(REGISTRATION.TRIGGER(other));
        },
        [dispatch]
    );

    const handleSubmitPress = useMemo(() => handleSubmit(handleSubmitCallback), [handleSubmit, handleSubmitCallback]);

    const handleOnPressInter = useCallback(
        (field: string) => {
            if (
                field === 'first_name' ||
                field === 'last_name' ||
                field === 'email' ||
                field === 'password' ||
                field === 'confirmPassword'
            ) {
                setFocus(field);
            } else {
                handleSubmitPress();
            }
        },
        [setFocus, handleSubmitPress]
    );

    return (
        <RegistrationWrapper>
            <PageTitleText>Регистрация</PageTitleText>
            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        id="registration-input-first_name"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        nextFieldName="last_name"
                        placeholder="Имя"
                        withoutBorders
                    />
                )}
                name="first_name"
                defaultValue={''}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        id="registration-input-last_name"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        nextFieldName="email"
                        placeholder="Фамилия"
                        withoutBorders
                    />
                )}
                name="last_name"
                defaultValue={''}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        id="registration-input-email"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        nextFieldName="password"
                        placeholder="Электронная почта"
                        withoutBorders
                    />
                )}
                name="email"
                defaultValue={''}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <PasswordTextInput
                        {...field}
                        id="registration-input-password"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        nextFieldName="confirmPassword"
                        placeholder="Пароль"
                        withoutBorders
                    />
                )}
                name="password"
                rules={{
                    required: true,
                }}
                defaultValue={''}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <PasswordTextInput
                        {...field}
                        id="registration-input-doublePassword"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        nextFieldName=""
                        placeholder="Повторите пароль"
                        withoutBorders
                    />
                )}
                name="confirmPassword"
                defaultValue={''}
            />

            <ButtonWrapper>
                <StyledButton
                    additionalStyles={{ width: '60%' }}
                    onClick={handleSubmitPress}
                    label="Зарегистрироваться"
                    disabled={formState.isSubmitted && !formState.isValid}
                />
            </ButtonWrapper>
        </RegistrationWrapper>
    );
});

export default Registration;
