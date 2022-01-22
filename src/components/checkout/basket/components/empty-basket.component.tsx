import { Button } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { device } from '../../../../../public/screen-sizes';
import { LocaleStrings } from '../../../../locale';
import { BodyText, BodyLink, TextColor, TextSize, TextWeight, TitleText } from '../../../../ui/text';
import EmptyBasketIcon from '../../../../../public/assets/empty-basket.png';

export const BasketWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px auto 79px;
    height: 60vh;
    padding-top: 100px;
`;

const EmptyBasketImage = styled.img`
    max-width: 12%;
    height: auto;
    resize-mode: contain;
    align-items: center;
`;

const EmptyBasketText = styled(BodyText).attrs({ size: TextSize.SMALL })`
    margin-top: 5px;
    margin-left: 40px;
`;

const EmptyBasketTitle = styled(TitleText).attrs({ size: TextSize.LARGE, color: TextColor.LIGHT })`
    margin-top: 50px;
    margin-left: 40px;
`;

export const EmptyBasket: React.FC = React.memo(function EmptyBasket() {
    const history = useHistory();

    const continueShoppingHandle = useCallback(() => {
        history.push('/catalog/all');
    }, [history]);

    return (
        <BasketWrapper>
            <EmptyBasketImage src={EmptyBasketIcon} />
            <EmptyBasketTitle>Ваша корзина пока пуста</EmptyBasketTitle>
            <EmptyBasketText>
                Перейдите в{' '}
                <BodyLink color={TextColor.MEDIUM} href="/catalog">
                    каталог
                </BodyLink>{' '}
                и добавьте товары
            </EmptyBasketText>
        </BasketWrapper>
    );
});
