import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './filter.css';

import { AppMultipleSelectorWithoutLabel } from '../../../ui/app-selector.component';
import { SelectedFilterSection, SET_FILTER_SECTIONS } from '../actions';
import { updateFilterSections } from '../helpers/update-filters-sections';
import { getSelectedFilters } from '../selector';

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
        (event) => {
            let updatedSelectedFilters: SelectedFilterSection[] | undefined = updateFilterSections(
                selectedFilters || [],
                event.target.value,
                enName,
                'multiple'
            );

            dispatch(SET_FILTER_SECTIONS(updatedSelectedFilters));
        },
        [enName, selectedFilters, dispatch]
    );

    return (
        <AppMultipleSelectorWithoutLabel
            param={filterValues}
            values={selectedFiltersValues}
            onChange={handleChangeMultiple}
        />
    );
});
