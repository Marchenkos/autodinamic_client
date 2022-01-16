import { Breadcrumbs, Link } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getSelectedCategory } from '../product-category/selectors';

import { FETCH_PRODUCT_BY_ID } from './actions';
import { ProductDetails } from './components/product-details.component';

const Wrapper = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    padding: 50px;
`;

const BreadcrumbsWrapper = styled.div`
    display: flex;
    margin-bottom: 20px;

    @media (max-width: 809px) {
        display: none;
    }
`;

const ProductDetailsScreen: React.FC = React.memo(function ProductDetailsScreen() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const selectedCategory = useSelector(getSelectedCategory);

    useEffect(() => {
        dispatch(FETCH_PRODUCT_BY_ID.TRIGGER(parseInt(id)));
    }, [dispatch, id]);

    return (
        <Wrapper>
            <BreadcrumbsWrapper>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link style={{ fontSize: '13px' }} color="inherit" href="/">
                        Главная
                    </Link>
                    <Link
                        style={{ fontSize: '13px' }}
                        color="inherit"
                        href={`/catalog/${selectedCategory.category_name}`}
                    >
                        Каталог
                    </Link>
                </Breadcrumbs>
            </BreadcrumbsWrapper>
            <ProductDetails />
        </Wrapper>
    );
});

export default ProductDetailsScreen;
