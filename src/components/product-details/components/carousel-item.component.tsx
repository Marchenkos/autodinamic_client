import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BodyText, TextColor, TextSize } from '../../../ui/text';
import { IProduct, OrderItem } from '../../../graphql/entities';
import { NULLABLE_IMAGE } from './product-detail-image.component';
import { StyledButton } from '../../../ui/new-styled';

export const CarouselItemWrapper = styled.div`
    flex-basis: 20%;
    min-width: 17%;
    margin-right: 20px;
    position: relative;
    box-sizing: border-box;
    margin-bottom: 20px;

    @media (max-width: 780px) {
        min-width: 50%;
    }
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
    position: absolute;
    padding: 55% 30% 0;
    background: #00000047;
    display: ${({ show }) => (show ? 'block' : 'none')};
    top: 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

const FullNameText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })`
    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

interface ProductListItemProps {
    product: IProduct;
    smallVersion?: boolean;
}

export const CarouselItem: React.FC<ProductListItemProps> = React.memo(function CarouselItem({
    product,
    smallVersion,
}: ProductListItemProps) {
    const [isOver, setIsOver] = useState(false);
    let history = useNavigate();

    const navigateToTheProductDetails = useCallback(() => {
        history(`/product-details/${product.id}`);
    }, [history, product]);

    return (
        <CarouselItemWrapper onMouseOver={() => setIsOver(true)} onMouseOut={() => setIsOver(false)}>
            <ImageBlock>
                <OverBlock show={isOver}>
                    <StyledButton
                        additionalStyles={{ width: '100%', padding: '5px' }}
                        onClick={navigateToTheProductDetails}
                        label="Подробнее"
                    />
                </OverBlock>
                <ProductImage src={product.images ? product.images[0].displayUrl : NULLABLE_IMAGE} />
            </ImageBlock>
            <ProductItemInfo>
                <DescriptionBlock>
                    <FullNameText>{product.name}</FullNameText>
                    <BodyText size={TextSize.EXTRA_SMALL} color={TextColor.BLUE}>
                        {product.price} BYN
                    </BodyText>
                </DescriptionBlock>
            </ProductItemInfo>
        </CarouselItemWrapper>
    );
});
