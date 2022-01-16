import { SelectedFilterSection } from '../actions';
import { checkFilterSections } from './check-filters';

export const addFilterSections = (
    selectedFilters: SelectedFilterSection[],
    filterValue: string,
    filterName: string,
    type: string
): SelectedFilterSection[] | undefined => {
    let isShouldAdd = true;

    const updatedSelectedFilters = selectedFilters.map((filter) => {
        if (filter.name === filterName) {
            isShouldAdd = false;
            const updatedValue = filter.values;

            if (updatedValue.length > 0 && (filterValue === 'Да' || filterValue === 'Нет')) {
                return {
                    name: filterName,
                    values: [filterValue],
                    type,
                };
            }

            if (updatedValue.length > 0) {
                updatedValue.push(filterValue);
            }

            return {
                name: filterName,
                values: updatedValue,
                type,
            };
        }

        return filter;
    });

    isShouldAdd &&
        updatedSelectedFilters.push({
            name: filterName,
            values: [filterValue],
            type,
        });

    return checkFilterSections(updatedSelectedFilters);
};

export const addFilterRangeSections = (
    selectedFilters: SelectedFilterSection[],
    filterValue: string[],
    filterName: string,
    type: string
): SelectedFilterSection[] | undefined => {
    let isShouldAdd = true;

    const updatedSelectedFilters = selectedFilters.map((filter) => {
        if (filter.name === filterName) {
            isShouldAdd = false;

            return {
                name: filterName,
                values: filterValue,
                type,
            };
        }

        return filter;
    });

    isShouldAdd &&
        updatedSelectedFilters.push({
            name: filterName,
            values: filterValue,
            type,
        });

    return checkFilterSections(updatedSelectedFilters);
};

export const removeFilterSections = (
    selectedFilters: SelectedFilterSection[],
    filterValue: any,
    filterName: string,
    type: string
): SelectedFilterSection[] | undefined => {
    const updatedSelectedFilters = selectedFilters.map((filter) => {
        if (filter.name === filterName) {
            if (filter.values) {
                const updatedValue = filter.values;

                updatedValue.splice(updatedValue.indexOf(filterValue), 1);

                return {
                    name: filterName,
                    values: updatedValue,
                    type,
                };
            }

            return {
                name: filterName,
                values: [],
                type,
            };
        }

        return filter;
    });

    return checkFilterSections(updatedSelectedFilters);
};

export const toggleOnlyOne = (
    selectedFilters: SelectedFilterSection[],
    filterValue: boolean,
    filterName: string,
    type: string
): SelectedFilterSection[] | undefined => {
    let isShouldAdd = true;
    const strValue = filterValue ? 'Да' : 'Нет';

    const updatedSelectedFilters = selectedFilters.map((filter) => {
        if (filter.name === filterName) {
            isShouldAdd = false;

            return {
                name: filterName,
                values: [],
                type,
            };
        }

        return filter;
    });

    isShouldAdd &&
        updatedSelectedFilters.push({
            name: filterName,
            values: [strValue],
            type,
        });

    return checkFilterSections(updatedSelectedFilters);
};

export const updateFilterSections = (
    selectedFilters: SelectedFilterSection[],
    filterValues: string[],
    filterName: string,
    type: string
): SelectedFilterSection[] | undefined => {
    let isShouldAdd = true;

    const updatedSelectedFilters = selectedFilters.map((filter) => {
        if (filter.name === filterName) {
            isShouldAdd = false;

            return {
                name: filterName,
                values: filterValues,
                type,
            };
        }

        return filter;
    });

    isShouldAdd &&
        updatedSelectedFilters.push({
            name: filterName,
            values: filterValues,
            type,
        });

    return checkFilterSections(updatedSelectedFilters);
};
