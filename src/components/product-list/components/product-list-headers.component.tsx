import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { CategoryNames } from '../../../graphql/interfaces';
import { BodyText, TextSize, TextWeight, TextColor } from '../../../ui/text';
import { GET_FILTER_BY_CATEGORY } from '../../filter/actions';
import { Sorting } from '../../filter/sort/sorting.component';
import { capitalizeString } from '../../filter/utilites/formated-string';
import { SET_CATEGORY } from '../../product-category/actions';
import { getSelectedCategory, getCategoryNames } from '../../product-category/selectors';

const HWrapper = styled.div`
    min-width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e4e4e4;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    padding: 3px 0;
    margin-bottom: 10px;
    margin-right: 15px;
`;

const CategoryHeaderWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 10px 0;
    box-sizing: border-box;
    padding: 0px 100px;
    justify-content: flex-start;
`;

const SortSection = styled.div`
    display: flex;
    margin: 25px 120px 5px 0px;
    justify-content: flex-end;
`;

const FilterTitle = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL })`
    margin-top: 6px;
    margin-right: 10px;
    color: #868585;
`;

const SortTitle = styled(FilterTitle)`
    min-width: 130px;
    margin-right: 0px;
    color: #868585;
`;

const ProductInfoText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL })<{ selected?: boolean }>`
    ${({ selected }) => (selected ? 'color: #6d9e9e' : TextColor.MEDIUM)};
    cursor: pointer;

    &:hover {
        color: #6d9e9e;
    }
`;

export const ProductListHeaders: React.FC = React.memo(function ProductListScreen() {
    const dispatch = useDispatch();
    const allProductCategories = useSelector(getCategoryNames);
    const selectedCategory = useSelector(getSelectedCategory);
    const history = useNavigate();

    const setCategory = useCallback(
        (selectedCategory: CategoryNames) => {
            dispatch(SET_CATEGORY(selectedCategory));
            history(`/catalog/${selectedCategory.category_name}`);
            dispatch(GET_FILTER_BY_CATEGORY.TRIGGER(selectedCategory.category_name));
        },
        [dispatch]
    );

    const createHeaders = useMemo(() => {
        return allProductCategories
            ? allProductCategories.map((item: CategoryNames, index: number) => (
                  <HWrapper key={index}>
                      <ProductInfoText onClick={() => setCategory(item)} selected={item === selectedCategory}>
                          {capitalizeString(item.title)}
                      </ProductInfoText>
                  </HWrapper>
              ))
            : [];
    }, [allProductCategories, selectedCategory]);

    return (
        <>
            <CategoryHeaderWrapper>{createHeaders}</CategoryHeaderWrapper>
            <SortSection>
                <Sorting />
            </SortSection>
        </>
    );
});
