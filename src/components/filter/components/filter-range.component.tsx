import React, { useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme } from '@material-ui/core/styles';
import Slider from '@mui/material/Slider';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';

import './filter.css';

import { FilterValueText } from './filter.desktop.component';
import { getSelectedFilters } from '../selector';
import { IFilter, ISelectedFilter } from '../../../graphql/interfaces';
import { REMOVE_FILTER, UPDATE_FILTERS } from '../actions';
import { BodyText, TextSize, TextWeight, TextColor } from '../../../ui/text';

const SectionTitle = styled(BodyText).attrs({
  size: TextSize.EXTRA_SMALL,
  weight: TextWeight.MEDIUM,
  color: TextColor.DARK,
})`
`;

const ValueWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export interface FilterRangeProps {
  filter: IFilter;
}

export const FilterRange: React.FC<FilterRangeProps> = React.memo(function FilterRange({
    filter
}: FilterRangeProps) {
    const selectedFilters = useSelector(getSelectedFilters);
    const dispatch = useDispatch();


    const maxValue = filter.values?.max || 0
    const minValue = filter.values?.min || 0



    // const [chosenValues, setChosenValues] = useState([minValue, maxValue]);

    const [value, setValue] = useState([minValue, maxValue]);

    const onChange = (e: any, newValue: any) => {
      setValue(newValue)
    }
    const handleOnChange = useCallback(
        (e: any, newValue: any) => {
            setValue(newValue);

            if (newValue.includes(minValue) && newValue.includes(maxValue)) {
              const isFilterExist = selectedFilters.find(f => f.id === filter.id)
      
              if (isFilterExist) {
                dispatch(REMOVE_FILTER(filter))
              }
            } else {
              dispatch(UPDATE_FILTERS({ ...filter, values: { range: { max: newValue[1], min: newValue[0] }}}))
            }
        },
        [selectedFilters, maxValue, minValue]
    );

    const muiTheme = createTheme({
        overrides: {
            MuiSlider: {
              root: {
                color: '#1c8686',
                width: '88%',
                display: 'block',
                margin: '0 auto',
              },
                thumb: {
                    color: '#1c8686',
                },
                track: {
                    color: '#2f9494',
                },
                rail: {
                    color: 'red',
                },
            },
        },
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <SectionTitle>{filter.displayName}</SectionTitle>
            <Slider
                value={value}
                onChange={onChange}
                onChangeCommitted={handleOnChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={minValue}
                max={maxValue}
                step={maxValue - minValue > 30 ? 10 : 1}
                marks
                disableSwap
            />
            <ValueWrapper>
                <FilterValueText>от {value[0]} BYN</FilterValueText>
                <FilterValueText>до {value[1]} BYN</FilterValueText>
            </ValueWrapper>
        </ThemeProvider>
    );
});
