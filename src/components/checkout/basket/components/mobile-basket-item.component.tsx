import React, { useCallback } from 'react';
import styled from 'styled-components';

import { device } from '../../../../../public/screen-sizes';
import { OrderProduct } from '../../../../graphql/entities';
import { Counter } from '../../../../ui/app-switch.component';
import { CrossedBodyText, TextWeight, TextSize, BodyText, TextColor } from '../../../../ui/text';

import { BasketItemDetailInfo } from './basket-item-detail-info.component';
import { getBasket } from '../selectors';
import { EDIT_BASKET, REMOVE_FROM_BASKET } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { NULLABLE_IMAGE } from '../../../product-details/components/product-detail-image.component';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 30px;
    justify-content: space-between;
`;

export const BasketCrossedBodyText = styled(CrossedBodyText).attrs({ weight: TextWeight.BOLD, size: TextSize.SMALL })`
    margin-right: 5px;

    @media ${device.laptop} {
        font-size: 12px;
    }
`;

export const BasketItemWrapper = styled.div`
    display: flex;
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
    max-width: 40%;
    height: auto;
    align-self: flex-start;
    margin-right: 10px;
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
    margin-bottom: 10px;
`;

const RemoveFromBasketText = styled(BlueBasketText)`
    cursor: pointer;
    &:hover {
        color: #4a8688;
    }
    align-self: flex-end;
    margin-bottom: 0px;
`;

export const BasketBodyText = styled(BasketText).attrs({ weight: TextWeight.DEFAULT })`
    flex-grow: 1;
`;

export interface BasketProducts {
    id: string;
    name: string;
    model: string;
    price: number;
    discount?: number;
    quantity: number;
}

export interface BasketItemProps {
    product: OrderProduct;
}

export const MobileBasketItem: React.FC<BasketItemProps> = React.memo(function MobileBasketItem({
    product,
}: BasketItemProps) {
    const { price, discount } = product;
    const discountPrice = discount ? (discount * price) / 100 : 0;
    const dispatch = useDispatch();

    const editCount = useCallback(
        (newCount: number) => {
            dispatch(
                EDIT_BASKET({
                    productId: product.id,
                    count: newCount,
                })
            );
        },
        [dispatch, product]
    );

    const handleRemove = useCallback(() => {
        dispatch(REMOVE_FROM_BASKET({ productId: product.id }));
    }, [product.id, dispatch]);

    return (
        <Wrapper>
            <BasketItemWrapper>
                <BasketItemImage src={product.images ? product.images[0].displayUrl : NULLABLE_IMAGE} />
                <BasketItemDetails>
                    <BasketText>{product.name}</BasketText>
                    {discount ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <BasketCrossedBodyText>{price.toFixed(1)} BYN</BasketCrossedBodyText>
                            <BlueBasketText>{`${(product.price - discountPrice).toFixed(1)} BYN`}</BlueBasketText>
                        </div>
                    ) : (
                        <BasketBodyText>{price * product.count} BYN</BasketBodyText>
                    )}
                    <Counter count={product.count} recalculatePrice={editCount} />
                    <RemoveFromBasketText onClick={handleRemove}>Удалить</RemoveFromBasketText>
                </BasketItemDetails>
            </BasketItemWrapper>
        </Wrapper>
    );
});
