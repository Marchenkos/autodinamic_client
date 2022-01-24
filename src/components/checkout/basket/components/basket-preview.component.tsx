import React from 'react';
import styled from 'styled-components';

import { TextSize, BodyText, TextWeight, TextColor } from '../../../../ui/text';
import { StyledLink } from '../../../../ui/styled-link.component';
import { getBasketItemsCount } from '../selectors';
import { useSelector } from 'react-redux';
import { StyledIcons } from '../../../../ui/styled-icon.component';

const BasketPreviewWrapper = styled.div`
    display: flex;
    align-items: center;

    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 10px;
    position: relative;

`;

const BasketDetailsWrapper = styled.div`
    width: 22px;
    height: 22px;
    justify-content: center;
    display: flex;
    align-items: center;
    border-radius: 10px;
    position: absolute;
    top: 5px;
    left: 11px;
    background: #343434;
`;

const SectionHeader = styled(BodyText).attrs({ color: TextColor.DARK })`
    font-family: 'Manrope';
    font-size: 14px;
    margin-left: -5px;
    margin-right: 10px;
`;

const BasketBodyText = styled(BodyText).attrs({ color: TextColor.BLUE })`
    font-size: 14px;
`;

export const BasketPreview: React.FC = React.memo(function BasketPreview() {
    const countItems = useSelector(getBasketItemsCount);

    return (
        <StyledLink to="/basket">
            <BasketPreviewWrapper>
                <StyledIcons size={23} className="icon-shopping-bag" />
                <SectionHeader>Корзина</SectionHeader>
                {countItems > 0 && 
                    <BasketDetailsWrapper>
                        <BasketBodyText>{countItems}</BasketBodyText>
                    </BasketDetailsWrapper>
                }
            </BasketPreviewWrapper>
        </StyledLink>
    );
});
