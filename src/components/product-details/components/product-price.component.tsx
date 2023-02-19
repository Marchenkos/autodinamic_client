import React from 'react';
import styled from 'styled-components';

import { TitleText, BodyText, TextColor, TextWeight, TextSize } from '../../../ui/text';
import { calculateDiscount } from '../helper/calculateDiscount';

const PriceText = styled(TitleText).attrs({ weight: TextWeight.MEDIUM, color: TextColor.BLUE })`
  font-size: 24px;
`;

const PriceWithoutDiscountText = styled(TitleText).attrs({ weight: TextWeight.MEDIUM, size: TextSize.LARGE })`
    margin: 5px 15px 0 0;
    color: #ababab;
    text-decoration: line-through;
`;

interface ProductPriceProps {
    price: number;
    discount?: number;
}

export const ProductPrice: React.FC<ProductPriceProps> = React.memo(function ProductDescription({
    price,
    discount,
}: ProductPriceProps) {
    return (
        <>
            <PriceText>{`${price} BYN`}</PriceText>
            {discount && (
                <PriceWithoutDiscountText>{`${calculateDiscount(price, discount)} BYN`}</PriceWithoutDiscountText>
            )}
        </>
    );
});
