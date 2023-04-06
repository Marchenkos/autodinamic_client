import React from 'react';
import styled from 'styled-components';

import { OrderProduct } from '../../../../graphql/entities';
import { BodyText, TextSize, TextColor, TextWeight } from '../../../../ui/text';
import { NULLABLE_IMAGE } from '../../../product-details/components/product-detail-image.component';

export const BasketItemWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 35px;

    @media (max-width: 850px) {
        justify-content: space-between;
        margin-bottom: 0px;
    }
`;

export const BasketItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    @media (max-width: 850px) {
        align-items: flex-end;
    }
`;

const BasketItemImage = styled.img`
    max-width: 100%;
    height: auto;
    align-self: flex-start;
    margin-right: 20px;
    margin-top: -30%;
`;

const BasketText = styled(BodyText).attrs({
    size: TextSize.EXTRA_SMALL,
    color: TextColor.DARK,
    weight: TextWeight.MEDIUM,
})``;

export const BasketBodyText = styled(BasketText).attrs({ weight: TextWeight.DEFAULT })`
    flex-grow: 1;
`;

const LabelText = styled(BodyText).attrs({
    color: TextColor.DARK,
    size: TextSize.EXTRA_SMALL,
    weight: TextWeight.MEDIUM,
})``;

const LabelGrayText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, weight: TextWeight.MEDIUM })`
    margin-right: 10px;
    color: #a2a2a2;
`;

const ImageWrapper = styled.div`
    height: 150px;
    overflow: hidden;
    margin-right: 10px;
    max-width: 20%;
`;

export interface OrderItemDetailProps {
    product: OrderProduct;
}

export const OrderItemDetail: React.FC<OrderItemDetailProps> = React.memo(function OrderItemDetail({
    product,
}: OrderItemDetailProps) {
    return (
        <BasketItemWrapper>
            <ImageWrapper>
                <BasketItemImage src={product.images ? product.images[0].displayUrl : NULLABLE_IMAGE} />
            </ImageWrapper>
            <BasketItemDetails>
                <BasketText>{product.name}</BasketText>
                <div style={{ display: 'flex' }}>
                    <LabelGrayText>Количество:</LabelGrayText>
                    <LabelText>{product.count}</LabelText>
                </div>
                <div>
                    <LabelText>{product.count * product.price} BYN</LabelText>
                </div>
            </BasketItemDetails>
        </BasketItemWrapper>
    );
});
