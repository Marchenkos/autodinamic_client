import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { callbackValidationSchema } from '../../validations/shemes';
import { ErrorLabel } from '../../validations/error-label.component';
import { FormInputText, AppTextAreaInput, MobileInput } from '../../../ui/app-input.component';
import { useDispatch, useSelector } from 'react-redux';
import { SEND_REQUEST_TO_CALLBACK } from '../actions';
import { getIsRequestWasSendedSuccess, getIsSending } from '../selector';
import { StyledButton, TextInput } from '../../../ui/new-styled';
import { RequestToCallbackPayload } from '../../../graphql/interfaces';
import { TitleText } from '../../../ui/text';

const FormWrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
`;

const CallbackFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 60px 200px 0px;
    
    border-top: 15px solid #498f91;
`;

const FormTitle = styled(TitleText)`
    font-size: 25px;
    margin-bottom: 50px;
`;

export const CallbackForm: React.FC = React.memo(function CallbackForm() {
    const dispatch = useDispatch();
    const isSending = useSelector(getIsSending);

    const { control, handleSubmit, formState, setFocus } = useForm<RequestToCallbackPayload>({
        mode: 'onBlur',
        resolver: yupResolver(callbackValidationSchema),
    });

    const handleSubmitCallback = useCallback(
        (formInput: RequestToCallbackPayload) => {
            dispatch(SEND_REQUEST_TO_CALLBACK.TRIGGER(formInput));
        },
        [dispatch]
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
            if (
                field === 'email' ||
                field === 'name' ||
                field === 'phoneNumber' ||
                field === 'message'
            ) {
                setFocus(field);
            } else {
                handleSubmitPress();
            }
        },
        [setFocus, handleSubmitPress]
    );

    return (
        <CallbackFormWrapper>
            <FormTitle>Форма обратной связи</FormTitle>
            <FormWrapper>
                <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextInput
                            {...field}
                            id="input-name"
                            isError={fieldState.error}
                            onPressInter={handleOnPressInter}
                            nextFieldName="email"
                            placeholder="Имя"
                            withoutBorders
                        />
                    )}
                    name="name"
                    defaultValue={''}
                />

                <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextInput
                            {...field}
                            id="input-email"
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
                        <MobileInput
                            {...field}
                            isError={fieldState.error}
                            label="Номер телефона"
                            placeholder="Номер телефона"
                        />
                    )}
                    name="phoneNumber"
                    defaultValue={''}
                />
                <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                        <AppTextAreaInput
                            {...field}
                            label="Сообщение"
                            placeholder="Ваше сообщение"
                            isError={fieldState.error}
                        />
                    )}
                    name="message"
                    defaultValue={''}
                />
                <StyledButton
                    additionalStyles={{ marginTop: '50px', width: '200px', alignSelf: 'self-end' }}
                    onClick={handleSubmitPress}
                    disabled={isDisableButton}
                    label="Отправить"
                />
            </FormWrapper>
        </CallbackFormWrapper>
    );
});
