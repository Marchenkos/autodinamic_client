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
import { GeneralProduct } from '../../../graphql/entities';
import { useIsInWishlist } from '../hooks/useIsInWishlist';

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

interface ProductDescriptionProps {
	productDescription: GeneralProduct; 
}

export const ProductDescription: React.FC<ProductDescriptionProps> = React.memo(function ProductDescription({
	productDescription
}) {
    const deviceSize = getDeviceSize();
	const isInWishlist = useIsInWishlist({ productId: productDescription.id })

    return (
        <ShortDetailSectionWrapper>
            {deviceSize > 809 ? (
                <>
                    {productDescription.discount && <DiscountLabel>{`Скидка ${productDescription.discount}%`}</DiscountLabel>}
                    <ProductHeaderText>{productDescription.full_name}</ProductHeaderText>
                    <ProductCodeText>
                        код товара: <BoldSmallText>{productDescription.code}</BoldSmallText>
                    </ProductCodeText>
                </>
            ) : null}
            <OtherDescriptionText>{productDescription.description}</OtherDescriptionText>
            <PriceSection>
                <ProductPrice price={productDescription.price} discount={productDescription.discount} />
            </PriceSection>

            {productDescription.maker ? <DescriptionText>Производитель - {productDescription.maker}</DescriptionText> : null}
            {productDescription.guarantee ? <DescriptionText>Гарантия - {productDescription.guarantee} месяцев</DescriptionText> : null}

            <ButtonWrapper>
                <ProductAddToBasketButton product={productDescription} />
                <ProductAddToWishlistButton isInWishlist={isInWishlist} productId={productDescription.id} />
            </ButtonWrapper>

            {/* <ProductAddToCompareButton product={product} withLabel /> */}
        </ShortDetailSectionWrapper>
    );
});
