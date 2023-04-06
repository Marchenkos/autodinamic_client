import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getSelectedProduct } from '../selectors';
import { getDeviceSize } from '../../../utils/check-device-size';
import {
    ProductAddToBasketButton,
    ProductAddToWishlistButton,
} from './product-buttons.component';
import { TitleText, BodyText, TextColor, TextWeight, TextSize, BoldSmallText } from '../../../ui/text';
import { ProductPrice } from './product-price.component';
import { IProduct } from '../../../graphql/entities';
import { useIsInWishlist } from '../hooks/useIsInWishlist';

const ShortDetailSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    @media (max-width: 850px) {
        padding: 0 20px;
    }
`;

export const DiscountLabel = styled.div`
    display: flex;
    justify-content: center;
    padding: 5px;
    color: white;
    background: #d84a4a;
    width: 100px;
    border-radius: 5px;
    font-size: 14px;
    margin-bottom: 20px;
    align-items: center;
`;

const PriceSection = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 10px 0 20px;
`;

const DescriptionText = styled(TitleText).attrs({ size: TextSize.MEDIUM })`
    margin: 5px 0;
`;

const OtherDescriptionText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.DARK })`
    margin: 10px 0;
`;

export const ProductHeaderText = styled(TitleText)`
    font-size: 25px;
    margin-bottom: 10px;
    font-weight: 700;

    @media (max-width: 1000px) {
        font-size: 22px;
    }
`;

export const ProductBrandText = styled(TitleText)`
    font-size: 30px;
    margin-bottom: 5px;
    font-weight: 400;
    color: #53b2b4;

    @media (max-width: 1000px) {
        font-size: 22px;
    }
`;

const DesctopProductTitles = styled.div`
    display: block;
    @media (max-width: 850px) {
        display: none;
    }
`;

export const ProductCodeText = styled(BodyText).attrs({ size: TextSize.EXTRA_EXTRA_SMALL })`
    color: #b9b8b8;
    margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 90%;
    margin-top: 20px;
    align-items: center;
    column-gap: 20px;
`;

const DividingLine = styled.hr`
  border-color: #e6e6e612;
  margin: 20px 0;
`;

interface ProductDescriptionProps {
  product: IProduct;
}

export const ProductDescription: React.FC<ProductDescriptionProps> = React.memo(function ProductDescription({
  product,
}) {
    const deviceSize = getDeviceSize();
    const isInWishlist = useIsInWishlist({ productId: product.id });

    return (
        <ShortDetailSectionWrapper>
            <DesctopProductTitles>
                {product.discount && (
                    <DiscountLabel>{`Скидка ${product.discount}%`}</DiscountLabel>
                )}

                <ProductHeaderText>{`${product.name}`}</ProductHeaderText>
                <ProductCodeText>
                    Код товара: {product.sku}
                </ProductCodeText>
                <ProductPrice price={product.price} discount={product.discount} />

                <DividingLine />

            </DesctopProductTitles>

            <OtherDescriptionText>{product.description}
            Все характеристики товаров взаимствованы с официальных сайтов и каталогов. При отсутствие каких-либо
                важных для Вас характеристик товара, мы настоятельно рекомендуем уточнять все детали у продавца, а также
                проводить внимательный осмотр изделия при получении.
            </OtherDescriptionText>

            <DividingLine />

            {product.maker ? (
                <DescriptionText>Производитель - {product.maker}</DescriptionText>
            ) : null}
            {product.guarantee ? (
                <DescriptionText>Гарантия - {product.guarantee} месяцев</DescriptionText>
            ) : null}


            <ButtonWrapper>
                <ProductAddToBasketButton product={product} />
                <ProductAddToWishlistButton productId={product.id} />
            </ButtonWrapper>

            {/* <ProductAddToCompareButton product={product} withLabel /> */}
        </ShortDetailSectionWrapper>
    );
});
