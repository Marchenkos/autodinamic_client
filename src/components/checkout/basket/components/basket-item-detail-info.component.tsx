import React from 'react';
import styled from 'styled-components';

import { device } from '../../../../../public/screen-sizes';
import { OrderProduct } from '../../../../graphql/entities';
import { BodyText, TextSize, TextColor, TextWeight } from '../../../../ui/text';
import { NULLABLE_IMAGE } from '../../../product-details/components/product-detail-image.component';

export const BasketItemWrapper = styled.div`
    display: flex;
    width: 60%;
`;

export const BasketItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const ImageWrapper = styled.div`
    height: 200px;
    overflow: hidden;

    @media ${device.laptop} {
        height: 350px;
    }
`;

const BasketItemImage = styled.img`
    max-width: 20%;
    height: auto;
    align-self: flex-start;
    margin-right: 20px;
`;

const BasketText = styled(BodyText).attrs({
    size: TextSize.EXTRA_SMALL,
    color: TextColor.DARK,
    weight: TextWeight.MEDIUM,
})``;

const BlueBasketText = styled(BodyText).attrs({
    size: TextSize.EXTRA_SMALL,
    color: TextColor.BLUE,
    weight: TextWeight.MEDIUM,
})`
    cursor: pointer;
    &:hover {
        color: #4a8688;
    }
`;

export const BasketBodyText = styled(BasketText).attrs({ weight: TextWeight.DEFAULT })`
    flex-grow: 1;
`;

export interface BasketItemProps {
    product: OrderProduct;
    handleRemove: () => void;
}

export const BasketItemDetailInfo: React.FC<BasketItemProps> = React.memo(function BasketItemDetailInfo({
    product,
    handleRemove,
}: BasketItemProps) {
    return (
        <BasketItemWrapper>
            <BasketItemImage src={product.images ? product.images[0].displayUrl : NULLABLE_IMAGE} />
            <BasketItemDetails>
                <BasketText>{product.full_name}</BasketText>
                <BasketBodyText>{product.code}</BasketBodyText>
                <BlueBasketText onClick={handleRemove}>Удалить</BlueBasketText>
            </BasketItemDetails>
        </BasketItemWrapper>
    );
});
