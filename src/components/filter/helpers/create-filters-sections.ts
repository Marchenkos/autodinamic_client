import { SelectedFilterSection } from '../actions';

export const createFilterSections = (filterValue: any, filterName: string, type: string): SelectedFilterSection[] => {
    if (Array.isArray(filterValue)) {
        return [
            {
                name: filterName,
                values: filterValue,
                type,
            },
        ];
    }

    return [
        {
            name: filterName,
            values: [filterValue],
            type,
        },
    ];
};
