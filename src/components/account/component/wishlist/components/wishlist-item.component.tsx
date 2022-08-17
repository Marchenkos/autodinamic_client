import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { GeneralProduct } from '../../../../../graphql/entities';
import { BodyText, TextSize, TextColor } from '../../../../../ui/text';
import { ProductAddToWishlistButton } from '../../../../product-details/components/product-buttons.component';
import { NULLABLE_IMAGE } from '../../../../product-details/components/product-detail-image.component';
import { useIsInWishlist } from '../../../../product-details/hooks/useIsInWishlist';

export const WishlistItemWrapper = styled.div<{ small?: boolean }>`
    flex-basis: 22%;
    min-width: 22%;
    position: relative;
    margin-bottom: 50px;
    margin-left: 25px;
    box-sizing: border-box;
    cursor: pointer;

    @media (max-width: 1400px) {
        flex-basis: 30%;
        min-width: 30%;
    }

    @media (max-width: 1150px) {
        flex-basis: 40%;
        min-width: 40%;
    }

    @media (max-width: 850px) {
		flex-basis: 100%;
        min-width: 100%;
		margin-left: 0;
    }

    ${({ small }) =>
        small &&
        `
            flex-basis: 20%;
            min-width: 20%;
            margin: 0 20px;
    `}
`;

const Section = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SectionIcons = styled(Section)`
    top: 5px;
    right: 5px;
    position: absolute;
    z-index: 2;
    width: 100px
    height: 100px;
`;

const ProductItemInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
`;

const ProductImageWrapper = styled.div`
    overflow: hidden;
    position: relative;
`;

const DescriptionBlock = styled.div`
    flex-grow: 1;
`;

const ProductImage = styled.img`
    max-width: 100%;
    height: auto;
    margin-top: -15%;
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

interface WishlistItemProps {
    product: GeneralProduct;
}

export const WishlistItem: React.FC<WishlistItemProps> = React.memo(function WishlistItem({
    product,
}: WishlistItemProps) {
    let history = useHistory();
	const isInWishlist = useIsInWishlist({ productId: product.id })

    const navigateToTheProductDetails = useCallback(() => {
        history.push(`/product-details/${product.id}`);
    }, [history, product]);

    return (
        <WishlistItemWrapper>
            <ProductImageWrapper>
                <SectionIcons>
                    <ProductAddToWishlistButton productId={product.id} isInWishlist={isInWishlist} />
                </SectionIcons>
                {product.discount && <DiscountLabel>{`-${product.discount}%`}</DiscountLabel>}
                <ProductImage
                    onClick={navigateToTheProductDetails}
                    title={product.full_name}
                    alt={`Изображение товара ${product.full_name}`}
                    src={product.images ? product.images[0].displayUrl : NULLABLE_IMAGE}
                />
            </ProductImageWrapper>

            <ProductItemInfo>
                <DescriptionBlock>
                    <BodyText size={TextSize.EXTRA_SMALL} color={TextColor.MEDIUM}>
                        {product.type}
                    </BodyText>
                    <BodyText
                        size={TextSize.EXTRA_SMALL}
                        color={TextColor.DARK}
                    >{`${product.brand} ${product.part_number}`}</BodyText>
                    <BodyText size={TextSize.EXTRA_SMALL} color={TextColor.DARK}>{`${product.price} BYN`}</BodyText>
                </DescriptionBlock>
            </ProductItemInfo>
        </WishlistItemWrapper>
    );
});
