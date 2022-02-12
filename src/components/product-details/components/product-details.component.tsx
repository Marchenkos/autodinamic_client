import React, { useEffect } from 'react';
import styled from 'styled-components';

import { DiscountLabel, ProductHeaderText, ProductCodeText, ProductDescription } from './product-description.component';
import { ProductSpecifications } from './product-specifications.component';
import { NULLABLE_IMAGE, ProductDetailsImage } from './product-detail-image.component';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { getSelectedProduct } from '../selectors';
import { CompareToast } from '../../compare-products/components/compare-toast.component';
import { getDeviceSize } from '../../../utils/check-device-size';
import { getSelectedCategory } from '../../product-category/selectors';
import { ProductImage } from '../../../graphql/entities';
import { SimilarProductCarousel } from './similar-products.component';
import { BoldSmallText } from '../../../ui/text';

const ProductDetailsWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    background: #fff;
`;

const Wrapper = styled.div`
    display: flex;

    @media (max-width: 810px) {
        flex-direction: column;
    }
`;

const ProductHeaderTextWrapper = styled.div`
    margin: 10px 0;
    display: none;

    @media (max-width: 810px) {
        display: block;
    }
`;

export const ProductDetails: React.FC = React.memo(function ProductDetails() {
    const product = useSelector(getSelectedProduct);

    //ERROR UI
    if (!product) {
        return null;
    }

    return (
        <ProductDetailsWrapper>
            <Wrapper>
                <ProductHeaderTextWrapper>
                    {product.product.discount && <DiscountLabel>{`Скидка ${product.product.discount}%`}</DiscountLabel>}
                    <ProductHeaderText>{product.product.full_name}</ProductHeaderText>
                    <ProductCodeText>
                        Код товара: <BoldSmallText>{product.product.code}</BoldSmallText>
                    </ProductCodeText>
                </ProductHeaderTextWrapper>

                <ProductDetailsImage images={product.product.images} />
                <ProductDescription productDescription={product.product} />
            </Wrapper>
            <ProductSpecifications />
            <SimilarProductCarousel />
            {/* <CompareToast /> */}
        </ProductDetailsWrapper>
    );
});
