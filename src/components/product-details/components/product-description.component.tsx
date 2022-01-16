import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getSelectedProduct } from '../selectors';
import { getDeviceSize } from '../../../utils/check-device-size';
import {
    ProductAddToBasketButton,
    ProductAddToCompareButton,
    ProductAddToWishlistButton,
} from './product-buttons.component';
import { TitleText, BodyText, TextColor, TextWeight, TextSize, BoldSmallText } from '../../../ui/text';
import { ProductPrice } from './product-price.component';

const ShortDetailSectionWrapper = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    max-width: 500px;
    margin-left: 150px;

    @media (max-width: 810px) {
        width: 100%;
        margin-left: 0;
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
    margin: 35px 0 15px;
`;

export const ProductHeaderText = styled(TitleText).attrs({ weight: TextWeight.MEDIUM })`
    font-size: 33px;
    margin-bottom: 20px;
`;

const PriceText = styled(TitleText).attrs({ weight: TextWeight.MEDIUM, size: TextSize.LARGE, color: TextColor.BLUE })`
    margin: 5px 15px 0 0;
`;

const PriceWithoutDiscountText = styled(TitleText).attrs({ weight: TextWeight.MEDIUM, size: TextSize.LARGE })`
    margin: 5px 15px 0 0;
    color: #ababab;
    text-decoration: line-through;
`;

export const ProductCodeText = styled(BodyText)`
    margin-top: 0px;
    text-transform: lowercase;
    font-size: 16px;
    color: #b9b8b8;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 90%;
    margin-top: 50px;
`;

export const ProductDescription: React.FC = React.memo(function ProductDescription() {
    const selectedProduct = useSelector(getSelectedProduct);
    const deviceSize = getDeviceSize();

    if (!selectedProduct) {
        return null;
    }

    const { product } = selectedProduct;

    return (
        <ShortDetailSectionWrapper>
            {deviceSize > 809 ? (
                <>
                    {product.discount && <DiscountLabel>{`Скидка ${product.discount}%`}</DiscountLabel>}
                    <ProductHeaderText>{product.full_name}</ProductHeaderText>
                    <ProductCodeText>
                        код товара: <BoldSmallText>{product.code}</BoldSmallText>
                    </ProductCodeText>
                </>
            ) : null}
            <OtherDescriptionText>{product.description}</OtherDescriptionText>
            <PriceSection>
                <ProductPrice price={product.price} discount={product.discount} />
            </PriceSection>

            {product.maker ? <DescriptionText>Производитель - {product.maker}</DescriptionText> : null}
            {product.guarantee ? <DescriptionText>Гарантия - {product.guarantee} месяцев</DescriptionText> : null}

            <ButtonWrapper>
                <ProductAddToBasketButton product={product} />
                <ProductAddToWishlistButton product={product} />
            </ButtonWrapper>

            {/* <ProductAddToCompareButton product={product} withLabel /> */}
        </ShortDetailSectionWrapper>
    );
});
