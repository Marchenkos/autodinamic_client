import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { commentValidationSchema } from '../../validations/shemes';
import { AppTextAreaInput } from '../../../ui/app-input.component';
import { useDispatch, useSelector } from 'react-redux';
import { StyledButton } from '../../../ui/new-styled';
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

interface CommentData {
    comment: string;
}

export const CommentForm: React.FC = React.memo(function CallbackForm() {
    const dispatch = useDispatch();

    const { control, handleSubmit } = useForm<CommentData>({
        resolver: yupResolver(commentValidationSchema),
    });

    const handleSubmitCallback = useCallback(
        (formInput: CommentData) => {
            console.log('send');
        },
        [dispatch]
    );

    const handleSubmitPress = useMemo(() => handleSubmit(handleSubmitCallback), [handleSubmit, handleSubmitCallback]);

    return (
        <FormWrapper>
            <UserInfoWrapper>
                <Controller
                    control={control}
                    render={(attrs) => <AppTextAreaInput {...attrs} label="Отзыв" placeholder="Ваш отзыв" />}
                    name="comment"
                    defaultValue={''}
                />
                <StyledButton additionalStyles={{ marginTop: '10px' }} onClick={handleSubmitPress} label="Отправить" />
            </UserInfoWrapper>
        </FormWrapper>
    );
});
