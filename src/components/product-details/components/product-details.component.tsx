import React, { useEffect } from 'react';
import styled from 'styled-components';
import useBreadcrumbs from "use-react-router-breadcrumbs";

import {
    DiscountLabel,
    ProductHeaderText,
    ProductBrandText,
    ProductCodeText,
    ProductDescription,
} from './product-description.component';
import { ProductSpecifications } from './product-specifications.component';
import { ProductDetailsImage } from './product-detail-image.component';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedProduct } from '../selectors';

import { BodyText, BoldSmallText } from '../../../ui/text';

const ProductDetailsWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    padding-top: 30px;
`;

//TODO tabled = mobile
const ImageWrapper = styled.div`
    display: flex;
    width: 60%;
    flex-direction: column;

    @media (max-width: 850px) {
        width: 100%;
        margin-top: 30px;
    }
`;

const DescriptionWrapper = styled.div`
    width: 40%;
    padding-right: 20px;

    @media (max-width: 850px) {
      width: 100%;
    }
`;

const Wrapper = styled.div`
    display: flex;
    column-gap: 30px;

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
    padding: 0 80px;
    margin-top: 20px;
    font-size: 14px;
    color: #b7b7b7;
    line-height: 20px;
`;

export const ProductDetails: React.FC = React.memo(function ProductDetails() {
    const product = useSelector(getSelectedProduct);
    const breadcrumbs = useBreadcrumbs();

    //ERROR UI
    if (!product) {
        return null;
    }

    return (
        <ProductDetailsWrapper>
          {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
            <Wrapper>
                <MobileProductHeaders>
                    {product.discount && <DiscountLabel>{`Скидка ${product.discount}%`}</DiscountLabel>}
                    <ProductBrandText>{product.brand.name}</ProductBrandText>

                    <ProductHeaderText>{product.name}</ProductHeaderText>
                    <ProductCodeText>
                        Код товара: <BoldSmallText>{product.sku}</BoldSmallText>
                    </ProductCodeText>
                </MobileProductHeaders>

                <ImageWrapper>
                  <ProductDetailsImage images={product.images} />
                </ImageWrapper>
                <DescriptionWrapper>
                  <ProductDescription product={product} />
                </DescriptionWrapper>
            </Wrapper>
            <ProductSpecifications product={product} />
            {/* <SimilarProductCarousel /> */}
            <WarningMassage>
                * Все характеристики товаров взаимствованы с официальных сайтов и каталогов. При отсутствие каких-либо
                важных для Вас характеристик товара, мы настоятельно рекомендуем уточнять все детали у продавца, а также
                проводить внимательный осмотр изделия при получении.
            </WarningMassage>
            {/* <CompareToast /> */}
        </ProductDetailsWrapper>
    );
});
