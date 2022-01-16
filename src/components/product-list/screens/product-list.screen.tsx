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

const ProductListScreen: React.FC = React.memo(function ProductListScreen() {
    const location = useLocation();
    const currentCategory = useMemo(() => location.pathname.split('/').pop(), [location]);

    const dispatch = useDispatch();
    const categoryNames = useSelector(getCategoryNames);

    const selectedCategory: CategoryNames | undefined = useMemo(() => {
        if (currentCategory && categoryNames) {
            return categoryNames.find((item) => item.category_name === currentCategory);
        }
        return undefined;
    }, [currentCategory, categoryNames]);

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
            <ProductList category={selectedCategory} />
        </Wrapper>
    );
});

export default ProductListScreen;
