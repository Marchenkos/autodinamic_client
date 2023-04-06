import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {  useNavigate } from 'react-router-dom';

import { BodyText, TextColor, TextSize, TextWeight } from '../../../ui/text';
import { IProduct, OrderProduct } from '../../../graphql/entities';
import { NULLABLE_IMAGE } from '../../product-details/components/product-detail-image.component';
import { SHOW_CONFIRM_MODAL, SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { ProductAddToBasketButton, ProductAddToWishlistButton } from '../../product-details/components/product-buttons.component';
import { useIsInWishlist } from '../../product-details/hooks/useIsInWishlist';
import img8 from '../../../../public/assets/test-pr.jpeg';
import { UIAddToWishList } from '../../../ui/components/add-to-with-list.component';
import { StyledButton } from '../../../ui/new-styled';
import { UIAddToCompareList } from '../../../ui/components/add-to-compare-list.component';
import { Breadcrumbs } from '../../breadcrumbs/breadcrumbs.component';

const Section = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;


const ButtonsSection = styled(Section)`
  column-gap: 10px;
  padding-left: 10px;
`;

const SectionIcons = styled(Section)`
    display: none;
    top: 5px;
    right: 5px;
    position: absolute;
    z-index: 2;
    width: 100px
    height: 100px;
`;

export const ProductListItemWrapper = styled.div<{ small?: boolean }>`
    position: relative;
    box-sizing: border-box;
    cursor: pointer;
    height: 350px;
    border-radius: 6px;
    display: grid;
    grid-template-rows: 3fr 1fr 1fr;
    padding-bottom: 10px;

    -webkit-box-shadow: 1px 2px 15px -5px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 1px 2px 15px -5px rgba(34, 60, 80, 0.2);
    box-shadow: 1px 2px 15px -5px rgba(34, 60, 80, 0.2);

    ${({ small }) =>
        small &&
        `
            flex-basis: 20%;
            min-width: 20%;
            margin: 0 20px;
    `}

  &:hover ${SectionIcons} {
    display: block;
`;

const ProductItemInfo = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    padding: 10px 20px;
`;

const ProductImageWrapper = styled.div`
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
`;

const ButtonWrapper = styled.div`

`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
`;

const DiscountLabel = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px 5px 20px;
    color: white;
    background: #d84a4a;
    width: 40px;
    font-size: 14px;
    align-items: center;
    position: absolute;
    left: 15px;
    font-family: 'MANROPE';
`;

const ProductText = styled(BodyText)<{ customColor?: string; small?: boolean }>`
	font-size: ${(props) => (props.small ? props.theme.text.fontSize.XS : props.theme.text.fontSize.S)}px;
	color: ${(props) => (props.customColor ? props.customColor : '#333333')};
	font-weight: ${(props) => (props.small ? props.theme.text.fontWeight.S : props.theme.text.fontWeight.M)};

	@media (max-width: 650px) {
		font-size: 12px;
    }
`;

const ProductPriceText = styled(BodyText).attrs({ size: TextSize.SMALL, weight: TextWeight.MEDIUM })`
    color: #54a2a4;

    @media (max-width: 650px) {
      font-size: 14px;
    }
`;

const NewLabel = styled(DiscountLabel)<{ isSecondLabel?: boolean }>`
    background: #7fbfb6;

    ${(props) =>
        props.isSecondLabel &&
        `
        top: 50px;
    `};
`;

interface ProductListItemProps {
    product: IProduct;
    isNew: boolean;
}

export const ProductListItem: React.FC<ProductListItemProps> = React.memo(function ProductListItem({
    product,
    isNew,
}: ProductListItemProps) {
    let history = useNavigate();

    const navigateToTheProductDetails = useCallback(() => {
        history(`/product-details/${product.id}`);
    }, [history, product]);

    return (
        <ProductListItemWrapper>
            <ProductImageWrapper>
              
                <SectionIcons>
                  <UIAddToWishList productId={product.id} />
                </SectionIcons>
                {product.discount && <DiscountLabel>{`-${product.discount}%`}</DiscountLabel>}
                {isNew && <NewLabel isSecondLabel={!!product.discount}>{`NEW`}</NewLabel>}
                <ProductImage
                    onClick={navigateToTheProductDetails}
                    title={product.name}
                    alt={`Изображение товара ${product.name}`}
                    src={product.images ? product.images[0].displayUrl : img8}
                />
            </ProductImageWrapper>

            <ProductItemInfo>
              <div>
                  <ProductText>{`${product.brand.displayName} ${product.partyNumber}`}</ProductText>
                  <ProductText small>{product.details.type}</ProductText>
              </div>

              <ProductPriceText>{`${product.price} BYN`}</ProductPriceText>
            </ProductItemInfo>
            <ButtonsSection>

              <ProductAddToBasketButton product={product} isSecondary />
         

            <UIAddToCompareList productId={product.id} />

            </ButtonsSection>

        </ProductListItemWrapper>
    );
});
