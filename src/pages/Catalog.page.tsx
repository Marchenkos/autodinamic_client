import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { ICategoryName } from '../graphql/interfaces';
import { SET_FILTER_SECTIONS } from '../components/filter/actions';
import { SET_CATEGORY } from '../components/product-category/actions';
import { getCategoryNames } from '../components/product-category/selectors';
import { CatalogComponent } from '../components/catalog/components/catalog.component';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
    padding-bottom: 40px;
    min-height: 70vh;
`;

const CatalogPage: React.FC = React.memo(function CatalogPage() {
    const [searchParams] = useSearchParams();

    const dispatch = useDispatch();
    const categoryNameList = useSelector(getCategoryNames);

    const category: ICategoryName | undefined = useMemo(() => {
      const currentCategory = searchParams.get('category');

      return categoryNameList.find((item) => item.name === currentCategory);
    }, [categoryNameList, searchParams]);

    useEffect(() => {
        if (category) {
            dispatch(SET_CATEGORY(category));

            //?????
            dispatch(SET_FILTER_SECTIONS(undefined));
        }
    }, [dispatch, category]);

    return (
        <Wrapper>
            <CatalogComponent category={category} />
        </Wrapper>
    );
});

export default CatalogPage;
