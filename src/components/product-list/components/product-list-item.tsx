import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { BodyText, TextColor, TextSize } from '../../../ui/text';
import { GeneralProduct, OrderProduct } from '../../../graphql/entities';
import { NULLABLE_IMAGE } from '../../product-details/components/product-detail-image.component';
import { SHOW_CONFIRM_MODAL, SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { ProductAddToWishlistButton } from '../../product-details/components/product-buttons.component';
import { useIsInWishlist } from '../../product-details/hooks/useIsInWishlist';

export const ProductListItemWrapper = styled.div<{ small?: boolean }>`
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
        flex-basis: 28%;
        min-width: 28%;
    }

    @media (max-width: 650px) {
        min-width: 49%;
        flex-basis: 49%;
        margin-left: 0px;
        margin-bottom: 20px;
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

const SectionIcons = styled(Section)<{ show?: boolean }>`
    display: ${({ show }) => (show ? 'block' : 'none')};
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
    width: 100px;
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

const ProductText = styled(BodyText)<{ customColor?: string; small?: boolean }>`
	font-size: ${(props) => (props.small ? '12px' : '14px')};
	color: ${(props) => (props.customColor ? props.customColor : '#333333')};
	margin-bottom: -3px

	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

	@media (max-width: 650px) {
		font-size: 12px;
    }
`;

const ProductPriceText = styled(BodyText)`
    font-size: 16px;
    font-weight: 500;
    color: #232323;
    margin-top: 6px;

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
    product: GeneralProduct;
    isNew: boolean;
}

export const ProductListItem: React.FC<ProductListItemProps> = React.memo(function ProductListItem({
    product,
    isNew,
}: ProductListItemProps) {
    const [isOver, setIsOver] = useState(false);
    let history = useHistory();
    const isInWishlist = useIsInWishlist({ productId: product.id });

    const navigateToTheProductDetails = useCallback(() => {
        history.push(`/product-details/${product.id}`);
    }, [history, product]);

    return (
        <ProductListItemWrapper onMouseOver={() => setIsOver(true)} onMouseOut={() => setIsOver(false)}>
            <ProductImageWrapper>
                <SectionIcons show={isOver}>
                    <ProductAddToWishlistButton isInWishlist={isInWishlist} productId={product.id} />
                </SectionIcons>
                {product.discount && <DiscountLabel>{`-${product.discount}%`}</DiscountLabel>}
                {isNew && <NewLabel isSecondLabel={!!product.discount}>{`NEW`}</NewLabel>}
                <ProductImage
                    onClick={navigateToTheProductDetails}
                    title={product.full_name}
                    alt={`Изображение товара ${product.full_name}`}
                    src={product.images ? product.images[0].displayUrl : NULLABLE_IMAGE}
                />
            </ProductImageWrapper>

            <ProductItemInfo>
                <DescriptionBlock>
                    <ProductText small customColor="#54a2a4">{`${product.brand} ${product.part_number}`}</ProductText>
                    <ProductText>{product.type}</ProductText>
                    <ProductPriceText>{`${product.price} BYN`}</ProductPriceText>
                </DescriptionBlock>
            </ProductItemInfo>
        </ProductListItemWrapper>
    );
});
