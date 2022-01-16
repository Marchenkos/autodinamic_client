import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { FormInputTextProps, TextInput } from './text-input.component';

const StyledWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: flex-end;
    position: relative;
`;

const PasswordButton = styled.div`
    color: #47a9a9;
    font-size: 14px;
    position: absolute;
    right: 15px;
    bottom: 20px;
    cursor: pointer;
    font-family: 'Manrope';

    &:hover {
        color: #307373;
    }
`;

export const PasswordTextInput = React.forwardRef<HTMLInputElement, FormInputTextProps>(function PasswordTextInput(
    props: FormInputTextProps,
    ref
) {
    const { isError, labelName, nextFieldName, onPressInter, ...otherProps } = props;
    const [isHidden, setIsHidden] = useState(true);
    const handleTogglePassword = useCallback(() => {
        setIsHidden((prevState) => !prevState);
    }, [isHidden, nextFieldName]);

    return (
        <StyledWrapper>
            <TextInput {...props} ref={ref} type={isHidden ? 'password' : 'text'} />
            <PasswordButton onClick={handleTogglePassword}>{isHidden ? 'Показать' : 'Скрыть'}</PasswordButton>
        </StyledWrapper>
    );
});
