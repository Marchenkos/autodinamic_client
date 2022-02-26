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
    margin: 35px 0 15px;
`;

export const ProductHeaderText = styled(TitleText)`
	font-size: 25px;
    margin-bottom: 10px;
    font-weight: 500;


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

export const ProductCodeText = styled(BodyText)`
    margin-top: 0px;
    font-size: 16px;
    color: #b9b8b8;
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 90%;
    margin-top: 20px;
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
			<DesctopProductTitles>
				{productDescription.discount && <DiscountLabel>{`Скидка ${productDescription.discount}%`}</DiscountLabel>}
				<ProductBrandText>{productDescription.brand}</ProductBrandText>

				<ProductHeaderText>{productDescription.full_name}</ProductHeaderText>
				<ProductCodeText>
					Код товара: <BoldSmallText>{productDescription.code}</BoldSmallText>
				</ProductCodeText>
			</DesctopProductTitles>
       
            <OtherDescriptionText>{productDescription.description}</OtherDescriptionText>

            {productDescription.maker ? <DescriptionText>Производитель - {productDescription.maker}</DescriptionText> : null}
            {productDescription.guarantee ? <DescriptionText>Гарантия - {productDescription.guarantee} месяцев</DescriptionText> : null}

			<PriceSection>
                <ProductPrice price={productDescription.price} discount={productDescription.discount} />
            </PriceSection>

            <ButtonWrapper>
                <ProductAddToBasketButton product={productDescription} />
                <ProductAddToWishlistButton isInWishlist={isInWishlist} productId={productDescription.id} />
            </ButtonWrapper>

            {/* <ProductAddToCompareButton product={product} withLabel /> */}
        </ShortDetailSectionWrapper>
    );
});
