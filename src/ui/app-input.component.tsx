import React, { ComponentProps, useCallback } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

import { makeStyles, TextField, withStyles } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import InputMask from 'react-input-mask';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#60BDBF',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#60BDBF',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#60BDBF',
            },
            '&:hover fieldset': {
                borderColor: '#469a9c',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#60BDBF',
            },
        },
        '& .MuiFormHelperText-root': {
            color: '#d85055',
            fontWeight: 500,
            fontFamily: 'Manrope',
        },
    },
})(TextField);

export const CustomInput = styled(CssTextField)`
    color: #858590 !important;
    font-family: 'ISTOK WEB' !important;
    margin: 10px 0 !important;
    font-size: 14px;
    width: 90%;

    @media (max-width: 850px) {
        width: 100%;
    }
    
`;

const FullWidthInput = styled(CustomInput)`
    width: 100%;
`;

export interface FormInputTextProps {
    placeholder?: string;
    isError?: FieldError;
    type?: string;
    label?: string;
    helperText?: string | null;
    rows?: number;
    capitalize?: boolean;
    onPressInter?: () => void;
    noBorders?: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    resize: {
        fontSize: '14px',
    },
    capitalize: {
        fontSize: '14px',
        textTransform: 'capitalize',
    },
}));

export const FormInputText = React.forwardRef<HTMLInputElement | null, FormInputTextProps>(function FormInputText(
    props: FormInputTextProps,
    ref,
) {`    `
    const classes = useStyles();
    const { isError, capitalize, onPressInter, noBorders, ...otherProps } = props;

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
        <CustomInput
            {...otherProps}
            ref={ref}
            className={classes.margin}
            helperText={props.helperText}
            variant={noBorders ? 'standard' : 'outlined'}
            label={isError ? isError.message : props.label}
            rows={props.rows}
            type={props.type}
            onKeyPress={handleOnKeyPress}
            InputProps={{
                classes: {
                    input: capitalize ? classes.capitalize : classes.resize,
                },
            }}
            InputLabelProps={{ shrink: true, disabled: false, style: { fontSize: '16px', ...labelStyles } }}
            placeholder={props.placeholder}
        />
    );
});

export const MyInput: React.FC<any> = React.memo(function FormInputText(props) {
    const classes = useStyles();

    return (
        <CustomInput
            {...props}
            className={classes.margin}
            variant="outlined"
            label={props.label}
            rows={props.rows}
            InputProps={{
                classes: {
                    input: classes.resize,
                },
            }}
            InputLabelProps={{ shrink: true, style: { fontSize: '16px' } }}
            placeholder={props.placeholder}
        />
    );
});

export const AppTextAreaInput: React.FC<FormInputTextProps> = React.memo(function FormInputText(props) {
    const classes = useStyles();

    return (
        <FullWidthInput
            {...props}
            id="outlined-multiline-static"
            label={props.label}
            multiline
            rows={6}
            rowsMax={6}
            InputLabelProps={{ shrink: true, style: { fontSize: '16px' } }}
        />
    );
});

export const MobileInput: React.FC<FormInputTextProps> = React.memo(function FormInputText(inpProps) {
    const classes = useStyles();

    return (
        <InputMask {...inpProps} mask="+375 99 999 99 99" disabled={false}>
            {() => (
                <FullWidthInput
                    className={classes.margin}
                    label={inpProps.label}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    InputLabelProps={{ shrink: true, style: { fontSize: '16px' } }}
                />
            )}
        </InputMask>
    );
});
