import React, { useCallback } from 'react';
import styled from 'styled-components';

import { TitleText, BodyText, TextSize } from '../../../../ui/text';
import { LocaleStrings } from '../../../../locale';
import { BasketItem } from '../../basket/components/basket-item.component';
import { StyledButton } from '../../../../ui/new-styled';

export const BasketWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
    padding: 40px 0;
`;

export const ResultBasketWrapper = styled.div`
    width: 30%;
    padding: 20px;
    border: 2px solid #f2f2f2;
    margin-top: 40px;
    align-self: flex-end;
`;

export const ResultItemWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: ${(props: { first?: boolean }) => (props.first ? '25px' : '0')};
`;

export const ResultItemButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 40px;
`;

export const BasketTable = styled.table`
    width: 100%;
    border: 2px solid #f2f2f2;
    padding: 0 15px;
`;

export const BasketTableHeader = styled.th`
    color: ${(props) => props.theme.text.colours.M};
    font-size: ${(props) => props.theme.text.fontSize.XS}px;
    font-family: ${(props) => props.theme.text.fonts.default};
    text-align: left;
    padding: 10px 0;
    border-bottom: 2px solid #f2f2f2;
`;

export const BasketTableLine = styled.tr`
    width: 100%;
`;

export const BasketBodyText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    margin-right: 5px;
`;

export interface BasketProducts {
    id: string;
    name: string;
    model: string;
    price: number;
    discount?: number;
    quantity: number;
}

const basketConfig = {
    products: [
        {
            id: '11111',
            name: 'Видеорегистратор 70mai Smart Dash Cam ',
            model: '1s Midrive D06',
            price: 100,
            discount: 10,
            quantity: 1,
        },
        {
            id: '22222',
            name: 'Видеорегистратор 70mai Smart Dash Cam ',
            model: '1s Midrive D06',
            price: 100,
            quantity: 1,
        },
    ],
    count: 3,
};

export const OrderConfirmationItem: React.FC = React.memo(function OrderConfirmationItem() {
    const continueShoppingHandle = useCallback(() => {
        console.log('continueShoppingHandle');
    }, []);

    const confirmOrderHandle = useCallback(() => {
        console.log('confirmOrderHandle');
    }, []);

    const tableHeaders = LocaleStrings.checkout.basket.tableHeaders;

    return (
        <BasketWrapper>
            <TitleText>{LocaleStrings.checkout.basket.header}</TitleText>
            <BasketTable cellPadding="0" cellSpacing="0">
                <BasketTableLine>
                    {tableHeaders.map((header: string, index) => (
                        <BasketTableHeader key={index}>{header}</BasketTableHeader>
                    ))}
                </BasketTableLine>
            </BasketTable>
            <ResultBasketWrapper>
                <TitleText>{LocaleStrings.checkout.basket.resultCard.resultHeader}</TitleText>
                <ResultItemWrapper first>
                    <BasketBodyText>{LocaleStrings.checkout.basket.resultLabels.quantity}</BasketBodyText>
                    <BasketBodyText>{basketConfig.count}</BasketBodyText>
                </ResultItemWrapper>
                <ResultItemWrapper>
                    <BasketBodyText>{LocaleStrings.checkout.basket.resultLabels.totalPrice}</BasketBodyText>
                    <BasketBodyText>100 BYN</BasketBodyText>
                </ResultItemWrapper>
                <ResultItemButtonWrapper>
                    <StyledButton
                        label={LocaleStrings.checkout.basket.resultCard.continueShopping}
                        onClick={continueShoppingHandle}
                    />
                    <StyledButton
                        label={LocaleStrings.checkout.basket.resultCard.confirmOrder}
                        onClick={confirmOrderHandle}
                    />
                </ResultItemButtonWrapper>
            </ResultBasketWrapper>
        </BasketWrapper>
    );
});
