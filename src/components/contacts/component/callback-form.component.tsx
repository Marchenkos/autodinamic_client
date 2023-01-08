import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { callbackValidationSchema } from '../../validations/shemes';
import { useDispatch, useSelector } from 'react-redux';
import { SEND_REQUEST_TO_CALLBACK } from '../actions';
import { getIsRequestWasSendedSuccess, getIsSending } from '../selector';
import { StyledButton, TextAreaInput, TextInput } from '../../../ui/new-styled';
import { RequestToCallbackPayload } from '../../../graphql/interfaces';
import { TitleText } from '../../../ui/text';

const FormWrapper = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    @media (max-width: 800px) {
        width: 70%;
    }
`;

const CallbackFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormTitle = styled(TitleText)`
    font-size: 25px;
    margin-bottom: 50px;
`;

export const CallbackForm: React.FC = React.memo(function CallbackForm() {
    const dispatch = useDispatch();
    const isSending = useSelector(getIsSending);

    const { control, handleSubmit, formState, setFocus } = useForm<RequestToCallbackPayload>({
        mode: 'onSubmit',
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
            if (field === 'email' || field === 'name' || field === 'message') {
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
                        />
                    )}
                    name="email"
                    defaultValue={''}
                />
                <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextAreaInput
                            {...field}
                            id="input-message"
                            nextFieldName=""
                            isError={fieldState.error}
                            placeholder="Сообщение"
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
