import React, { useCallback, useMemo } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import styled from 'styled-components';
import { BodyText } from './text';

export interface CheckboxData {
    title: string;
    isSelected?: boolean;
    handleChange: () => void;
}

const CheckboxLabel = styled(BodyText)`
    font-size: 12px;
    color: #969696;
    margin-right: 30px;
    font-size: 12px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const AppCheckbox: React.FC<CheckboxData> = React.memo(function AppCheckbox({
    title,
    isSelected,
    handleChange,
}: CheckboxData) {
    const handleOnChange = useCallback(() => {
        handleChange();
    }, [title, handleChange]);

    return (
        <Wrapper>
            <Checkbox style={{ color: '#60BDBF' }} checked={isSelected} onChange={handleOnChange} color="primary" />
            <CheckboxLabel>{title}</CheckboxLabel>
        </Wrapper>
    );
});
