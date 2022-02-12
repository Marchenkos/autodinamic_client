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
import { calculateDiscount } from '../../../product-details/helper/calculateDiscount';
import { StyledIcons } from '../../../../ui/styled-icon.component';

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    justify-content: space-between;
    align-items: flex-start;
`;

export const BasketCrossedBodyText = styled(CrossedBodyText).attrs({ weight: TextWeight.BOLD, size: TextSize.SMALL })`
    margin-right: 5px;

    @media ${device.laptop} {
        font-size: 12px;
    }
`;

export const BasketBodyText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    margin-right: 5px;

    @media ${device.laptop} {
        font-size: 15px;
    }
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

export const BasketItem: React.FC<BasketItemProps> = React.memo(function BasketItem({ product }: BasketItemProps) {
    const { price, discount } = product;
    const dispatch = useDispatch();

    const editCount = useCallback(
        (newCount: number) => {
            dispatch(
                EDIT_BASKET.TRIGGER({
                    productId: product.id,
                    count: newCount,
                })
            );
        },
        [dispatch, product]
    );

    const handleRemove = useCallback(() => {
        dispatch(REMOVE_FROM_BASKET.TRIGGER(product.id));
    }, [product.id, dispatch]);

    return (
        <Wrapper>
            <BasketItemDetailInfo product={product} />
            <Counter count={product.count} recalculatePrice={editCount} />
            {discount ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <BasketCrossedBodyText>{price.toFixed(1)} BYN</BasketCrossedBodyText>
                    <BasketBodyText color={TextColor.BLUE}>{`${calculateDiscount(
                        price,
                        discount
                    )} BYN`}</BasketBodyText>
                </div>
            ) : (
                <BasketBodyText>{price * product.count} BYN</BasketBodyText>
            )}
            <StyledIcons className='icon-cancel' onClick={handleRemove} />
        </Wrapper>
    );
});
