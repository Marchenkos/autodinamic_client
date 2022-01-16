import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import styled from 'styled-components';

import './filter.css';
import { SelectedFilterSection, SET_FILTER_SECTIONS } from '../actions';
import { addFilterSections, removeFilterSections } from '../helpers/update-filters-sections';
import { getSelectedFilters } from '../selector';

export interface FilterCheckboxData {
    enName: string;
    filterValue: any;
}

const CustomCheckboxLabel = styled(FormControlLabel)`
    color: #969696 !important;
    font-family: 'ISTOK WEB' !important;
    margin-right: 30px !important;
`;

export const FilterCheckbox: React.FC<FilterCheckboxData> = React.memo(function FilterCheckbox({
    enName,
    filterValue,
}: FilterCheckboxData) {
    const selectedFilters = useSelector(getSelectedFilters);
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = React.useState(false);

    React.useEffect(() => {
        if (!selectedFilters) {
            setIsSelected(false);
        } else {
            selectedFilters.map((filter) => {
                if (filter.name === enName && filter.values.includes(filterValue)) {
                    setIsSelected(true);
                }
            });
        }
    }, [selectedFilters, enName, filterValue]);

    const handleOnChange = useCallback(
        (e: any, value: boolean) => {
            let updatedSelectedFilters: SelectedFilterSection[] | undefined = undefined;
            setIsSelected(value);

            let selectedValue = filterValue;

            const sfilters = selectedFilters || [];

            updatedSelectedFilters = value
                ? addFilterSections(sfilters, filterValue, enName, 'multiple')
                : removeFilterSections(sfilters, selectedValue, enName, 'multiple');

            dispatch(SET_FILTER_SECTIONS(updatedSelectedFilters));
        },
        [selectedFilters, filterValue, enName]
    );

    return (
        <CustomCheckboxLabel
            control={
                <Checkbox
                    style={{ color: '#60BDBF' }}
                    checked={isSelected}
                    onChange={handleOnChange}
                    name={filterValue}
                    color="primary"
                />
            }
            label={filterValue}
        />
    );
});
