import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryNames } from '../../../graphql/interfaces';

import { AppSelectorWithoutLabel } from '../../../ui/app-selector.component';
import { getSelectedCategory, getCategoryNames } from '../../product-category/selectors';

const Wrapper = styled.div`
    margin-right: 20px;

    @media (max-width: 860px) {
        margin-right: 0px;
    }
`;

interface CategorySelectorProps {
    isNew: boolean;
}

export const ProductCategorySelector: React.FC<CategorySelectorProps> = React.memo(function ProductCategorySelector({
    isNew,
}: CategorySelectorProps) {
    const dispatch = useDispatch();
    const allProductCategoryNames = useSelector(getCategoryNames);
    const selectedCategory = useSelector(getSelectedCategory);
    const history = useHistory();

    const handleOnChangeCategory = useCallback(
        (event: any) => {
            if (isNew) {
                history.push(`/new/${event.target.value}`);
            } else {
                history.push(`/catalog/${event.target.value}`);
            }
        },
        [dispatch, isNew]
    );

    const allCategoriesList = useMemo(
        () =>
            allProductCategoryNames
                ? allProductCategoryNames.map((item: CategoryNames) => {
                      return {
                          value: item.category_name,
                          label: item.title,
                      };
                  })
                : [],
        [allProductCategoryNames]
    );

    return (
        <Wrapper>
            <AppSelectorWithoutLabel
                param={allCategoriesList}
                onChange={handleOnChangeCategory}
                value={selectedCategory.category_name}
            />
        </Wrapper>
    );
});
