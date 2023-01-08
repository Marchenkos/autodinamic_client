import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './filter.css';

import { AppMultipleSelectorWithoutLabel } from '../../../ui/app-selector.component';
import { SelectedFilterSection, SET_FILTER_SECTIONS } from '../actions';
import { updateFilterSections } from '../helpers/update-filters-sections';
import { getSelectedFilters } from '../selector';
import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';
import { BodyText, TextSize } from '../../../ui/text';

const SelectorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 200px;

    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;

    ::-webkit-scrollbar {
        height: 6px;
        padding: 10px;
    }
    ::-webkit-scrollbar-track {
        background: rgb(240, 240, 240);
    }
    ::-webkit-scrollbar-thumb {
        background-color: #cee2e2;
        border-radius: 15px;
    }
`;

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const CheckboxLabel = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL })``;

export interface FilterCheckboxItemProps {
    itemName: string;
    checked: boolean;
    handleOnChange: (name: string) => void;
}

export const FilterCheckboxItem: React.FC<FilterCheckboxItemProps> = React.memo(function FilterCheckboxItem({
    itemName,
    handleOnChange,
    checked,
}: FilterCheckboxItemProps) {
    const onChange = useCallback(() => {
        handleOnChange(itemName);
    }, [handleOnChange, itemName]);

    return (
        <CheckboxWrapper>
            <Checkbox checked={checked} onChange={onChange} />
            <CheckboxLabel>{itemName}</CheckboxLabel>
        </CheckboxWrapper>
    );
});

export interface FilterSelectorProps {
    enName: string;
    filterValues: any;
}

export const FilterSelector: React.FC<FilterSelectorProps> = React.memo(function FilterCheckbox({
    enName,
    filterValues,
}: FilterSelectorProps) {
    const selectedFilters = useSelector(getSelectedFilters);
    const dispatch = useDispatch();
    const selectedFiltersValues = React.useMemo(() => {
        let values: SelectedFilterSection | undefined = undefined;

        if (selectedFilters) {
            values = selectedFilters.find((filter) => filter.name === enName);
        }

        return !!values ? values.values : [];
    }, [selectedFilters]);

    const handleChangeMultiple = useCallback(
        (newSelectedValues: string[]) => {
            let updatedSelectedFilters: SelectedFilterSection[] | undefined = updateFilterSections(
                selectedFilters || [],
                newSelectedValues,
                enName,
                'multiple'
            );

            dispatch(SET_FILTER_SECTIONS(updatedSelectedFilters));
        },
        [enName, selectedFilters, dispatch]
    );

    const handleCheckboxUpdate = useCallback(
        (name: string) => {
            let newSelectedValues = selectedFiltersValues;

            if (selectedFiltersValues.indexOf(name) === -1) {
                newSelectedValues.push(name);
            } else {
                newSelectedValues = selectedFiltersValues.filter((item) => item !== name);
            }

            handleChangeMultiple(newSelectedValues);
        },
        [selectedFiltersValues]
    );

    return (
        <SelectorWrapper>
            {filterValues.map((item, index) => (
                <FilterCheckboxItem
                    key={`${item}-${index}`}
                    checked={selectedFiltersValues.indexOf(item) > -1}
                    itemName={item}
                    handleOnChange={handleCheckboxUpdate}
                />
            ))}
        </SelectorWrapper>
    );
});
