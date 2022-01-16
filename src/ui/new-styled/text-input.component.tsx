import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

export interface FormInputTextProps {
    placeholder?: string;
    nextFieldName: string;
    isError?: FieldError;
    type?: string;
    labelName?: string;
    onPressInter?: (fieldName: string) => void;
    id: string;
    withoutBorders?: boolean;
}

const TextInputWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column-reverse;
    margin: 10px 0;
`;

const StyledInput = styled.input<{ isError?: boolean; noBorders?: boolean }>`
    height: 40px;
    padding-left: 7px;
    border: ${(props) => (props.isError ? '1px solid #d85055' : '1px solid #d6d6d6')};
    border-radius: 4px;
    outline: none;
    font-size: 15px;
    font-family: 'Manrope';

    ${(props) =>
        props.noBorders &&
        `
        border: none;
        border-bottom: 1px solid #d6d6d6;
        border-radius: 0px;
    `};

    &:focus {
        border: ${(props) => (props.isError ? '1px solid #d85055' : '1.5px solid #86b7b7')};

        ${(props) =>
            props.noBorders &&
            `
            border: none;
            border-bottom: ${props.isError ? '1px solid #d85055' : '1.5px solid #86b7b7'};
        `};
    }
`;

const StyledInputLabel = styled.label<{ isError?: boolean }>`
    font-size: 14px;
    margin-bottom: 5px;
    font-family: 'Manrope';
    color: ${(props) => (props.isError ? '#d85055' : '#334242')};
`;

export const TextInput = React.forwardRef<HTMLInputElement, FormInputTextProps>(function TextInput(
    props: FormInputTextProps,
    ref
) {
    const { isError, labelName, nextFieldName, onPressInter, withoutBorders = false, ...otherProps } = props;

    const handleOnKeyPress = useCallback(
        (event: any) => {
            if (event.key === 'Enter' && onPressInter) {
                onPressInter(nextFieldName);
            }
        },
        [onPressInter, nextFieldName]
    );

    return (
        <TextInputWrapper>
            <StyledInput
                noBorders={withoutBorders}
                {...otherProps}
                ref={ref}
                onKeyPress={handleOnKeyPress}
                isError={!!isError}
            />
            {labelName || isError ? (
                <StyledInputLabel isError={!!isError} htmlFor={otherProps.id}>
                    {isError ? isError.message : labelName}
                </StyledInputLabel>
            ) : null}
        </TextInputWrapper>
    );
});
