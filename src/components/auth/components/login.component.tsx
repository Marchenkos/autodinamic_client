import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_LOGIN_ERROR, LOG_IN } from '../actions';
import { getLoginError } from '../selectors';
import { loginValidationSchema } from '../../validations/shemes';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput, PasswordTextInput, StyledButton } from '../../../ui/new-styled';
import { LoginErrorType } from '../sagas/login.saga';
import { TitleText } from '../../../ui/text';

const PageTitleText = styled(TitleText)`
    font-size: 27px;
    margin: 0 auto 27px;
`;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    box-sizing: border-box;

    width: 60%;
    margin: 0 auto;

    @media (max-width: 850px) {
        width: 70%;
    }

    @media (max-width: 450px) {
        width: 90%;
    }
`;

export const HeaderWrapper = styled.div`
    display: flex;
    margin: 0 0 25px;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
`;

export const LoginHeader = styled.div`
    box-sizing: border-box;
    font-family: 'Istok Web';
    font-size: 25px;
    color: #525656;
    flex-grow: 1;
    text-align: center;
    margin: 0 0 30px;

    @media (max-width: 850px) {
        font-size: 16px;
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    margin: 20px 0 0;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
`;

export const SmallButton = styled.div`
    margin: 10px 0 0;
    color: #6a8681;
    font-family: 'Istok Web';
`;

const LoginErrorLabel = styled.div`
    color: #fd5555;
    font-size: 15px;
    font-family: 'Manrope';
`;

export interface LoginData {
    email: string;
    password: string;
}

const Login: React.FC = React.memo(function Login() {
    const { control, handleSubmit, formState, setFocus } = useForm<LoginData>({
        mode: 'onBlur',
        resolver: yupResolver(loginValidationSchema),
    });
    const dispatch = useDispatch();
    const loginError = useSelector(getLoginError);

    useEffect(() => {
        dispatch(CLEAR_LOGIN_ERROR());
    }, [dispatch]);

    const handleSubmitCallback = useCallback(
        (formInput: LoginData) => {
            dispatch(LOG_IN.TRIGGER(formInput));
        },
        [dispatch]
    );

    const loginErrorLabel: string = useMemo(() => {
        if (!!loginError && loginError.type === LoginErrorType.WRONG_CREDENTIALS) {
            return 'Неверные логин или пароль';
        }

        return 'Произошла какая-то ошибка, пожалуйста, проверьте введенные данные и повторите операцию';
    }, [loginError]);

    const handleSubmitPress = useMemo(() => handleSubmit(handleSubmitCallback), [handleSubmit, handleSubmitCallback]);

    const isDisableButton = useMemo(() => {
        if (!formState.isSubmitted) {
            return false;
        }

        return !formState.isValid;
    }, [formState.isSubmitted, formState.isValid]);

    const handleOnPressInter = useCallback(
        (field: string) => {
            if (field === 'password' || field === 'email') {
                setFocus(field);
            } else {
                handleSubmitPress();
            }
        },
        [setFocus, handleSubmitPress]
    );

    return (
        <LoginWrapper>
            <PageTitleText>Вход в аккаунт</PageTitleText>
            {loginError && <LoginErrorLabel>{loginErrorLabel}</LoginErrorLabel>}
            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <TextInput
                        {...field}
                        nextFieldName="password"
                        id="login-input-email"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        placeholder="E-mail"
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
                        nextFieldName=""
                        id="login-input-password"
                        isError={fieldState.error}
                        onPressInter={handleOnPressInter}
                        placeholder="Пароль"
                        type="password"
                        withoutBorders
                    />
                )}
                name="password"
                defaultValue={''}
            />

            <ButtonWrapper>
                <StyledButton
                    additionalStyles={{ width: '30%' }}
                    onClick={handleSubmitPress}
                    disabled={isDisableButton}
                    label="Вход"
                />
                <StyledButton
                    additionalStyles={{ width: '50%' }}
                    onClick={() => {}}
                    label="Забыли пароль?"
                    isSecondary={true}
                />
            </ButtonWrapper>
        </LoginWrapper>
    );
});

export default Login;
