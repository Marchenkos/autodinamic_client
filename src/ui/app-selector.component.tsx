import React from 'react';
import styled from 'styled-components';
import {
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    ListItemText,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    withStyles,
} from '@material-ui/core';
import { FieldError } from 'react-hook-form';

export interface AppSelectorProps {
    placeholder: string;
    type?: string;
    label: string;
    items: string[];
    isError?: FieldError;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: '8px 0',
        minWidth: 120,
        maxWidth: '100%',
    },
    formControl2: {
        margin: '8px 0',
        height: '40px',
        width: '200px',
        '@media (max-width: 860px)': {
            width: '100%',
			fontSize: '12px',
        },
        fontSize: '14px',
    },
    formControlMultiple: {
        margin: '8px 0',
        width: '200px',
        '@media (max-width: 860px)': {
            width: '100%',
			fontSize: '12px',
        },
        fontSize: '14px',
    },
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
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    menuPaper: {
        maxHeight: 200,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));

export const AppSelector: React.FC<AppSelectorProps> = React.memo(function AppSelector(props) {
    const classes = useStyles();
    const { isError, ...otherProps } = props;

    const labelStyles = isError
        ? {
              color: '#d85055',
          }
        : {};

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel style={{ ...labelStyles }}>{isError ? isError.message : props.label}</InputLabel>
            <Select displayEmpty {...otherProps}>
                {props.items.map((item, index) => (
                    <MenuItem key={index} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});

export interface AppSelectorWithoutLabelProps {
    value: string;
    onChange: (event: any) => void;
    param: {
        value: string;
        label: string;
    }[];
}

export const AppSelectorWithoutLabel: React.FC<AppSelectorWithoutLabelProps> = React.memo(function AppSelector({
    onChange,
    value,
    param,
}) {
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.formControl2}>
            <Select
                MenuProps={{ classes: { paper: classes.menuPaper } }}
                style={{ height: '40px', fontSize: '14px' }}
                onChange={onChange}
                value={value}
            >
                {param.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});

export interface AppMultipleSelectorWithoutLabel {
    values: string[];
    onChange: (event: any) => void;
    param: string[];
}

export const AppMultipleSelectorWithoutLabel: React.FC<AppMultipleSelectorWithoutLabel> = React.memo(
    function AppSelector({ onChange, values, param }: AppMultipleSelectorWithoutLabel) {
        const classes = useStyles();

        return (
            <FormControl variant="outlined" className={classes.formControlMultiple}>
                <Select
                    multiple
                    onChange={onChange}
                    value={values}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {((selected as unknown) as string[]).map((value: string) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                >
                    {param.map((item, index) => (
                        <MenuItem key={index} value={item}>
                            <Checkbox checked={values.indexOf(item) > -1} />
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
);
