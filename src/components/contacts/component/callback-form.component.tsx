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

const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;

    @media (max-width: 1220px) {
        width: 95%;
    }
`;

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;

    @media (max-width: 1220px) {
        flex-direction: column;
    }
`;

export const CallbackForm: React.FC = React.memo(function CallbackForm() {
    const dispatch = useDispatch();
    const isSending = useSelector(getIsSending);

    const form = useForm<RequestToCallbackPayload>({
        mode: 'onBlur',
        resolver: yupResolver(callbackValidationSchema),
    });

    const { control, handleSubmit, formState } = form;

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

    return (
        <FormWrapper>
            <UserInfoWrapper>
                <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextInput
                            {...field}
                            id="edit-name"
                            isError={fieldState.error}
                            placeholder="Имя"
                            nextFieldName="email"
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
                            id="edit-email"
                            nextFieldName="phoneNumber"
                            isError={fieldState.error}
                            placeholder="Email"
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
            </UserInfoWrapper>
            <UserInfoWrapper>
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
                    additionalStyles={{ marginTop: '10px' }}
                    onClick={handleSubmitPress}
                    disabled={isDisableButton}
                    label="Отправить"
                />
            </UserInfoWrapper>
        </FormWrapper>
    );
});
