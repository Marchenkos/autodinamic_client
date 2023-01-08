import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { CategoryNames } from '../graphql/interfaces';
import { SET_FILTER_SECTIONS } from '../components/filter/actions';
import { SET_CATEGORY } from '../components/product-category/actions';
import { getCategoryNames } from '../components/product-category/selectors';
import { ProductList } from '../components/product-list/components/product-list';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
    padding-bottom: 40px;
    min-height: 70vh;
`;

const CatalogPage: React.FC = React.memo(function CatalogPage() {
    let [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    const categoryNames = useSelector(getCategoryNames);

    const selectedCategory: CategoryNames | undefined = useMemo(() => {
      const currentCategory = searchParams.get('category');

      if (currentCategory && categoryNames) {
        return categoryNames.find((item) => item.category_name === currentCategory);
      }

      return undefined;
    }, [categoryNames, searchParams]);

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

export default CatalogPage;
