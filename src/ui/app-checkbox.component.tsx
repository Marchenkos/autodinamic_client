import React, { useCallback, useMemo } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import styled from 'styled-components';

export interface CheckboxData {
    title: string;
    isSelected?: boolean;
    handleChange: () => void;
}

export const CustomCheckboxLabel = styled(FormControlLabel)`
    color: #969696 !important;
    font-family: 'ISTOK WEB' !important;
    margin-right: 30px !important;

    @media (max-width: 850px) {
        font-size: 14px;
    }
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
        <CustomCheckboxLabel
            control={
                <Checkbox
                    style={{ color: '#60BDBF' }}
                    checked={isSelected}
                    onChange={handleOnChange}
                    name={title}
                    color="primary"
                />
            }
            label={title}
        />
    );
});
