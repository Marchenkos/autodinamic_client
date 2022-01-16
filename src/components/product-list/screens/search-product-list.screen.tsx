import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryNames } from '../../../graphql/interfaces';

import { SET_FILTER_SECTIONS } from '../../filter/actions';
import { SET_CATEGORY } from '../../product-category/actions';
import { getCategoryNames } from '../../product-category/selectors';

import { ProductList } from '../components/product-list';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
    padding-bottom: 40px;
    min-height: 70vh;
`;

const SearchProductListScreen: React.FC = React.memo(function SearchProductListScreen() {
    const location = useLocation();
    const dispatch = useDispatch();
    const categoryNames = useSelector(getCategoryNames);
    const searchParams = new URLSearchParams(location.search).get("searchTerms");

    const searchTerms = useMemo(() => {
        if (searchParams) {
            return searchParams.split(' ');
        }
    }, [searchParams]);

    const selectedCategory: CategoryNames | undefined = useMemo(() => {
        if (categoryNames) {
            return categoryNames.find((item) => item.category_name === 'all');
        }
        return undefined;
    }, [categoryNames]);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(SET_CATEGORY(selectedCategory));
            dispatch(SET_FILTER_SECTIONS(undefined));
        }
    }, [dispatch, selectedCategory]);

    //TODO!!!
    if (!selectedCategory) {
        return null;
    }

    return (
        <Wrapper>
            <ProductList category={selectedCategory} isNew={true} searchTerms={searchTerms} />
        </Wrapper>
    );
});

export default SearchProductListScreen;
