import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { GeneralProduct } from '../../../graphql/entities';

import { BodyText, TextColor, TextSize, TextWeight, TitleLink, TitleText } from '../../../ui/text';
import { ProductAddToWishlistButton, ProductAddToBasketButton } from './product-buttons.component';
import { NULLABLE_IMAGE } from './product-detail-image.component';
import './product-details.style.scss';

export const CarouselItemWrapper = styled.div`
    position: relative;
    box-sizing: border-box;
    max-width: 170px;
    cursor: pointer;
`;

export const ImageBlock = styled.div`
    max-width: 100%;
    position: relative;
`;

export const ProductItemInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: 10px 0;
`;

export const DescriptionBlock = styled.div`
    flex-grow: 1;
`;

export const ProductImage = styled.img`
    max-width: 100%;
    height: auto;
`;

export const OverBlock = styled.div<{ show?: boolean }>`
    display: ${({ show }) => (show ? 'block' : 'none')};
    top: 5px;
    right: 2px;
    position: absolute;
    z-index: 2;
    width: 100px
    height: 100px;
`;

const FullNameText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })`
    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

const PriceText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.BLUE })`
    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

export interface SimilarProductItemProps {
    item: GeneralProduct;
}

export const SimilarProductItem: React.FC<SimilarProductItemProps> = React.memo(function SimilarProductItem({
    item,
}: SimilarProductItemProps) {
    const [isOver, setIsOver] = useState(false);
    let history = useHistory();

    const navigateToTheProductDetails = useCallback(() => {
        history.push(`/product-details/${item.id}`);
    }, [history, item]);

    return (
        <CarouselItemWrapper onMouseOver={() => setIsOver(true)} onMouseOut={() => setIsOver(false)}>
            <ImageBlock>
                <OverBlock show={isOver}>
                    <ProductAddToWishlistButton product={item} />
                </OverBlock>
                <ProductImage
                    onClick={navigateToTheProductDetails}
                    src={item.images ? item.images[0].displayUrl : NULLABLE_IMAGE}
                />
            </ImageBlock>
            <ProductItemInfo>
                <DescriptionBlock>
                    <PriceText>{item.price} BYN</PriceText>
                    <FullNameText>{item.full_name}</FullNameText>
                </DescriptionBlock>
            </ProductItemInfo>
        </CarouselItemWrapper>
    );
});
