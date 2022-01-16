import React, { ComponentProps, useCallback } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

import { makeStyles, TextField, withStyles } from '@material-ui/core';

export interface FormInputTextProps {
    placeholder?: string;
    isError?: FieldError;
    type?: string;
    label: string;
    helperText?: string | null;
    rows?: number;
    capitalize?: boolean;
    onPressInter?: () => void;
}

export const FormInputText = React.forwardRef<HTMLDivElement | null, FormInputTextProps>(function FormInputText(
    props: FormInputTextProps,
    ref
) {
    const { isError, capitalize, onPressInter, ...otherProps } = props;

    const labelStyles = isError
        ? {
              color: '#d85055',
          }
        : {};

    const handleOnKeyPress = useCallback(
        (event: any) => {
            if (event.key === 'Enter' && onPressInter) {
                onPressInter();
            }
        },
        [onPressInter]
    );

    return (
        <div>
            <input />
        </div>
    );
});
