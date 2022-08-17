import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { EditProfilePayload } from '../../../../../graphql/mutations/user.mutation';
import { FormInputText, MobileInput } from '../../../../../ui/app-input.component';
import { personalDetailsAccountVSchema } from '../../../../validations/shemes';
import { UPDATE_PROFILE_INFO } from '../../../actions';
import { getUser } from '../../../selectors';
import { StyledButton } from '../../../../../ui/new-styled';

const Wrapper = styled.div`
    display: flex;
    width: 500px;
    flex-direction: column;
    margin-bottom: 80px;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const HorizontalWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
	flex-direction: row;

	@media (max-width: 850px) {
        flex-direction: column;
    }
`;

const NameWrapper = styled.div`
    width: 50%;

	@media (max-width: 850px) {
		width: 100%;
    }
`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 20px 0 0;
`;

export const AccountPersonalDetails: React.FC = React.memo(function AccountPersonalDetails() {
    const form = useForm<EditProfilePayload>({
        mode: 'onBlur',
        resolver: yupResolver(personalDetailsAccountVSchema),
    });

    const { control, handleSubmit, formState } = form;

    const currentUser = useSelector(getUser);
    const dispatch = useDispatch();

    const handleSubmitCallback = useCallback(
        (formInput: EditProfilePayload) => {
            dispatch(UPDATE_PROFILE_INFO.TRIGGER(formInput));
        },
        [dispatch]
    );

    const isDisableButton = useMemo(() => {
        return !formState.isValid;
    }, [formState.isSubmitted, formState.isValid]);

    const handleSubmitPress = useMemo(() => handleSubmit(handleSubmitCallback), [handleSubmit, handleSubmitCallback]);

    if (!currentUser) {
        return null;
    }

    return (
        <Wrapper>
            <HorizontalWrapper>
                <NameWrapper>
                    <Controller
                        control={control}
                        name="first_name"
                        render={({ field, fieldState }) => (
                            <FormInputText {...field} label="Имя*" isError={fieldState.error} capitalize={true} />
                        )}
                        defaultValue={currentUser.first_name}
                    />
                </NameWrapper>
                <NameWrapper>
                    <Controller
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormInputText
                                {...field}
                                isError={fieldState.error}
                                label="Фамилия*"
                                placeholder="Фамилия"
                            />
                        )}
                        name="last_name"
                        defaultValue={currentUser.last_name}
                    />
                </NameWrapper>
            </HorizontalWrapper>

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <FormInputText
                        {...field}
                        isError={fieldState.error}
                        label="E-mail*"
                        placeholder="Электронная почта"
                    />
                )}
                name="email"
                defaultValue={currentUser.email}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <MobileInput
                        {...field}
                        label="Номер телефона"
                        isError={fieldState.error}
                        placeholder="Номер телефона"
                    />
                )}
                name="phone_number"
                defaultValue={currentUser.phone_number ? currentUser.phone_number : ''}
            />

            <Controller
                control={control}
                render={({ field, fieldState }) => (
                    <FormInputText
                        {...field}
                        isError={fieldState.error}
                        label="День рождения"
                        type="date"
                        placeholder=""
                    />
                )}
                name="birthday"
                rules={{
                    required: false,
                }}
                defaultValue={currentUser.birthday ? currentUser.birthday : '2000-01-01'}
            />
            <ButtonWrapper>
                <StyledButton
                    additionalStyles={{ width: '40%' }}
                    onClick={handleSubmitPress}
                    label="Изменить"
                    disabled={isDisableButton}
                />
            </ButtonWrapper>
        </Wrapper>
    );
});
