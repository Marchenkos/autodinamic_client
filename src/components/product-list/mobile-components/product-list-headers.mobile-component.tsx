import { Drawer } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CategoryNames } from '../../../graphql/interfaces';

import { AppSelectorWithoutLabel } from '../../../ui/app-selector.component';
import { AppSwitch } from '../../../ui/controller.component';
import { BodyText, TextSize } from '../../../ui/text';
import { SET_FILTER_SECTIONS } from '../../filter/actions';
import { SimpleFilter } from '../../filter/components/filter-transition.component';
import { getSelectedFilters, getSelectedSort } from '../../filter/selector';
import { SET_CATEGORY } from '../../product-category/actions';
import { getSelectedCategory, getCategoryNames } from '../../product-category/selectors';
import { FETCH_PRODUCT_LIST } from '../actions';
import { LIMIT_PR_PAGE } from '../components/product-list';

const FilterTitle = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL })`
    margin-top: 6px;
    margin-right: 10px;
    color: #868585;
`;

const FilterIcons = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
`;

export const ProductListMobileHeaders: React.FC = React.memo(function ProductListScreen() {
    const dispatch = useDispatch();
    const categoryNames = useSelector(getCategoryNames);
    const selectedFilters = useSelector(getSelectedFilters);
    const selectedCategory = useSelector(getSelectedCategory);
    const selectedSort = useSelector(getSelectedSort);
    const [showFilter, setShowFilter] = useState(false);

    const switchFilterState = useCallback(() => {
        setShowFilter(showFilter ? false : true);
    }, [showFilter]);

    const handleOnChangeCategory = useCallback(
        (event: any) => {
            const chosenCategory = categoryNames
                ? categoryNames.find((item) => item.category_name === event.target.value)
                : undefined;

            if (chosenCategory) {
                dispatch(SET_CATEGORY(chosenCategory));
            }
        },
        [dispatch, categoryNames]
    );

    const allCategoriesList = useMemo(
        () =>
            categoryNames
                ? categoryNames.map((item: CategoryNames) => {
                      return {
                          value: item.category_name,
                          label: item.title,
                      };
                  })
                : [],
        [categoryNames]
    );

    const handleApplyFilter = useCallback(() => {
        dispatch(
            FETCH_PRODUCT_LIST.TRIGGER({
                limit: LIMIT_PR_PAGE,
                next: 0,
                categoryName: 'all',
                sort: selectedSort,
                filters: selectedFilters,
            })
        );
        switchFilterState();
    }, [dispatch, LIMIT_PR_PAGE, selectedFilters, selectedSort]);

    const handleCleanFilter = useCallback(() => {
        dispatch(SET_FILTER_SECTIONS(undefined));
    }, [dispatch]);

    return (
        <>
            <AppSelectorWithoutLabel
                param={allCategoriesList}
                onChange={handleOnChangeCategory}
                value={selectedCategory.category_name}
            />
            <FilterIcons>
                <FilterTitle>ФИЛЬТР</FilterTitle>
                <AppSwitch isChecked={showFilter} handleChange={switchFilterState} />
            </FilterIcons>
            <Drawer
                PaperProps={{ style: { width: '100%' } }}
                anchor="left"
                open={showFilter}
                onClose={switchFilterState}
            >
                <SimpleFilter applyFilter={handleApplyFilter} cleanFilter={handleCleanFilter} />
            </Drawer>
        </>
    );
});
