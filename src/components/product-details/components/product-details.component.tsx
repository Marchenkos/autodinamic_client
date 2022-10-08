import React, { useEffect } from 'react';
import styled from 'styled-components';

import {
    DiscountLabel,
    ProductHeaderText,
    ProductBrandText,
    ProductCodeText,
    ProductDescription,
} from './product-description.component';
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
import { BodyText, BoldSmallText } from '../../../ui/text';

const ProductDetailsWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    background: #fff;
`;

const Wrapper = styled.div`
    display: flex;
    padding: 0px 50px;
    box-sizing: border-box;

    @media (max-width: 850px) {
        flex-direction: column;
        padding: 0;
    }
`;

const MobileProductHeaders = styled.div`
    display: none;

    @media (max-width: 850px) {
        display: block;
        padding: 0 20px;
    }
`;

const WarningMassage = styled(BodyText)`
    padding: 0 50px;
    margin-top: 20px;
    font-size: 14px;
    color: #b7b7b7;
    line-height: 20px;
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
                <MobileProductHeaders>
                    {product.product.discount && <DiscountLabel>{`Скидка ${product.product.discount}%`}</DiscountLabel>}
                    <ProductBrandText>{product.product.brand}</ProductBrandText>

                    <ProductHeaderText>{product.product.full_name}</ProductHeaderText>
                    <ProductCodeText>
                        Код товара: <BoldSmallText>{product.product.code}</BoldSmallText>
                    </ProductCodeText>
                </MobileProductHeaders>

                <ProductDetailsImage images={product.product.images} />
                <ProductDescription productDescription={product.product} />
            </Wrapper>
            <ProductSpecifications product={product.productDetails} />
            <SimilarProductCarousel />
            <WarningMassage>
                * Все характеристики товаров взаимствованы с официальных сайтов и каталогов. При отсутствие каких-либо
                важных для Вас характеристик товара, мы настоятельно рекомендуем уточнять все детали у продавца, а также
                проводить внимательный осмотр изделия при получении.
            </WarningMassage>
            {/* <CompareToast /> */}
        </ProductDetailsWrapper>
    );
});
