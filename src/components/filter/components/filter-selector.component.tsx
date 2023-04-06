import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './filter.css';

import { getSelectedFilters } from '../selector';
import styled from 'styled-components';
import { Checkbox } from '@material-ui/core';
import { BodyText, TextColor, TextSize, TextWeight } from '../../../ui/text';
import { IFilter, ISelectedFilter } from '../../../graphql/interfaces';
import { REMOVE_FILTER, UPDATE_FILTERS } from '../actions';

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
  filter: IFilter;
}


const SectionTitle = styled(BodyText).attrs({
  size: TextSize.EXTRA_SMALL,
  weight: TextWeight.MEDIUM,
  color: TextColor.DARK,
})`
`;

export const FilterSelector: React.FC<FilterSelectorProps> = React.memo(function FilterCheckbox({
  filter
}: FilterSelectorProps) {
    const selectedFilters = useSelector(getSelectedFilters);
    const dispatch = useDispatch();

    const selectedValues: string[] = React.useMemo(() => {
        const foundFilter: ISelectedFilter | undefined = selectedFilters.find(f => f.name === filter.name);

        return foundFilter ? (foundFilter.values.list || []) : [];
    }, [selectedFilters]);

    // const handleChangeMultiple = useCallback(
    //     (newSelectedValues: string[]) => {
    //         const updatedSelectedFilters: ISelectedFilter[] | undefined = updateFilterSections(
    //             selectedFilters || [],
    //             newSelectedValues,
    //             enName,
    //             'multiple'
    //         );

    //         dispatch(SET_FILTER_SECTIONS(updatedSelectedFilters));
    //     },
    //     [enName, selectedFilters, dispatch]
    // );

    const handleCheckboxUpdate = useCallback(
        (name: string) => {
            let newSelectedValues = [...selectedValues];

            if (selectedValues.includes(name)) {
              newSelectedValues = selectedValues.filter((item) => item !== name);
            } else {
              newSelectedValues.push(name);
            }

            if (newSelectedValues.length) {
              dispatch(UPDATE_FILTERS({
                ...filter,
                values: {
                  list: newSelectedValues
                }
              }));
            } else {
              dispatch(REMOVE_FILTER(filter));
            }
        },
        [selectedValues]
    );

    if (!filter.values?.list) {
      return null;
    }

    return (
        <SelectorWrapper>
          <SectionTitle>{filter.displayName}</SectionTitle>
            {filter.values.list.map((item, index) => (
                <FilterCheckboxItem
                    key={`${item}-${index}`}
                    checked={selectedValues.indexOf(item) !== -1}
                    itemName={item}
                    handleOnChange={handleCheckboxUpdate}
                />
            ))}
        </SelectorWrapper>
    );
});
