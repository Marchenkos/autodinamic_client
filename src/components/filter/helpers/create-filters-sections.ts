import { SelectedFilterSection } from '../actions';

export const createFilterSections = (filterValue: any, filterName: string, type: string): SelectedFilterSection[] => {
    console.log(filterValue);

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
