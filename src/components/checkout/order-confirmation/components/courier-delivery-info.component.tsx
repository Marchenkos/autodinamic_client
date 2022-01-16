import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@material-ui/core';

import { BodyText, TextSize } from '../../../../ui/text';
import { FormInputText } from '../../../../ui/app-input.component';
import { StyledButton } from '../../../../ui/new-styled';

const CourierInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 45%;
    margin: 0 auto;
`;

const CustomInput = styled(Input)`
    margin: 15px 0 0;
    border-radius: 5px;
    padding: 10px;
    font-family: 'ISTOK WEB' !important;
    width: 60%;
`;

export interface CourierDeliveryData {
    city: string;
    address: string;
}

interface CourierDeliveryInfoProps {
    handleForm: (data: CourierDeliveryData) => void;
    handleBack: () => void;
}

export const CourierDeliveryInfo: React.FC<CourierDeliveryInfoProps> = React.memo(function PostDeliveryInfo({
    handleForm,
    handleBack,
}: CourierDeliveryInfoProps) {
    const form = useForm<CourierDeliveryData>({
        mode: 'onBlur',
    });
    const { control, handleSubmit } = form;

    const handleSubmitCallback = useCallback(
        (formInput: CourierDeliveryData) => {
            handleForm(formInput);
        },
        [handleForm]
    );

    const handleSubmitPress = useMemo(() => handleSubmit(handleSubmitCallback), [handleSubmit, handleSubmitCallback]);

    return (
        <CourierInfoWrapper>
            <Controller
                control={control}
                name="city"
                render={({ field, fieldState }) => (
                    <FormInputText {...field} label="Город" isError={fieldState.error} />
                )}
                rules={{
                    required: true,
                }}
                defaultValue={''}
            />
            <Controller
                control={control}
                name="address"
                render={({ field, fieldState }) => (
                    <FormInputText {...field} label="Адрес" isError={fieldState.error} />
                )}
                rules={{
                    required: true,
                }}
                defaultValue={''}
            />
            <StyledButton onClick={handleBack} additionalStyles={{ marginTop: '10px' }} label="Назад" isSecondary />
            <StyledButton additionalStyles={{ marginTop: '10px' }} onClick={handleSubmitPress} label="Далее" />
        </CourierInfoWrapper>
    );
});
