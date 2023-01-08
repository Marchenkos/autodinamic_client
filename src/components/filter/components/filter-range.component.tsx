import React, { useEffect, useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';

import './filter.css';

import { FilterValueText } from './filter.desktop.component';
import { SelectedFilterSection, SET_FILTER_SECTIONS } from '../actions';
import { createFilterSections } from '../helpers/create-filters-sections';
import { addFilterRangeSections } from '../helpers/update-filters-sections';
import { getSelectedFilters } from '../selector';

const ValueWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export interface FilterRangeProps {
    enName: string;
    max: number;
    min: number;
}

export const FilterRange: React.FC<FilterRangeProps> = React.memo(function FilterCheckbox({
    enName,
    min,
    max,
}: FilterRangeProps) {
    const selectedFilters = useSelector(getSelectedFilters);
    const dispatch = useDispatch();

    const [chosenValues, setChosenValues] = useState([min, max]);

    const steps = useMemo(() => {
        return max - min > 30 ? 10 : 1;
    }, [min, max]);

    const [value, setValue] = useState([min, max]);

    useEffect(() => {
        if (!selectedFilters) {
            setValue([min, max]);
        } else {
            selectedFilters.map((filter) => {
                if (filter.name === enName) {
                    const intValues = filter.values.map((i) => parseInt(i));

                    setValue(intValues);
                }
            });
        }
    }, [selectedFilters, enName, min, max]);

    const handleOnChange = useCallback(
        (e: any, value: any) => {
            setChosenValues(value);
            let updatedSelectedFilters: SelectedFilterSection[] | undefined = undefined;
            setValue(value);

            const strValues = value.map((v: number) => v.toString());

            if (!selectedFilters) {
                updatedSelectedFilters = createFilterSections(strValues, enName, 'range');

                dispatch(SET_FILTER_SECTIONS(updatedSelectedFilters));
            } else {
                updatedSelectedFilters = addFilterRangeSections(selectedFilters, strValues, enName, 'range');

                dispatch(SET_FILTER_SECTIONS(updatedSelectedFilters));
            }

            console.log('updatedSelectedFilters', updatedSelectedFilters);
        },
        [selectedFilters, value, enName]
    );

    const muiTheme = createTheme({
        overrides: {
            MuiSlider: {
                thumb: {
                    color: '#1c8686',
                },
                track: {
                    color: '#2f9494',
                },
                rail: {
                    color: '#c9c9c9',
                },
            },
        },
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <Slider
                value={value}
                onChangeCommitted={handleOnChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                max={max}
                marks={true}
                step={steps}
                min={min}
            />
            <ValueWrapper>
                <FilterValueText>от {chosenValues[0]} BYN</FilterValueText>
                <FilterValueText>до {chosenValues[1]} BYN</FilterValueText>
            </ValueWrapper>
        </ThemeProvider>
    );
});
