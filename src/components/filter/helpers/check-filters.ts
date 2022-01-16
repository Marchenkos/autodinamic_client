import { SelectedFilterSection } from '../actions';

export const checkFilterSections = (selectedFilters: SelectedFilterSection[]): SelectedFilterSection[] | undefined => {
    const updatedFilterd = selectedFilters.filter((filter) => filter.values.length > 0);

    return updatedFilterd.length > 0 ? updatedFilterd : undefined;
};
