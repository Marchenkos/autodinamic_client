import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { TextSize, BodyText, TextWeight, TextColor } from '../../../../ui/text';
import { StyledLink } from '../../../../ui/styled-link.component';
import { getBasketItemsCount } from '../selectors';
import { useSelector } from 'react-redux';
import { StyledIcons } from '../../../../ui/styled-icon.component';
import {  useNavigate } from 'react-router-dom';

const BasketPreviewWrapper = styled.button`
    display: flex;
    align-items: center;
    flex-direction: row;
    
    border: none;
    border-radius: 5px;
    padding: 15px 0px 15px 10px;
    position: relative;
    cursor: pointer;
    background: none;

    @media (max-width: 800px) {
        flex-direction: column;
        border: none;
        padding: 10px 0;
    }

    &: hover {
        background: #7aa0a1;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
    &:active {
        background: #d5e0e0;
    }
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

    @media (max-width: 800px) {
        top: 3px;
        left: 39px;
        background: none;
    }

`;

const MessageBlock = styled.div`
    padding: 10px 20px;
    background: #343434;
    color: white;
    position: absolute;
    bottom: -45px;
    width: 170px;
    left: -50px;
    font-family: 'Manrope';
    border-radius: 4px;
`;

const SectionHeader = styled(BodyText).attrs({ color: TextColor.DARK })`
    color: #fff;
    font-family: 'Manrope';
    font-size: 14px;

    @media (max-width: 1200px) {
      display: none;
  }
`;

const BasketBodyText = styled(BodyText).attrs({ color: TextColor.BLUE })`
    font-size: 14px;

    @media (max-width: 800px) {
        color: #41a4a6;
        font-weight: 600;
    }
`;

export const BasketPreview: React.FC = React.memo(function BasketPreview() {
    const countItems = useSelector(getBasketItemsCount);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const history = useNavigate();

    const handleOnMouseAction = useCallback(() => {
        if (showEmptyMessage) {
            setShowEmptyMessage(false);
        } else {
            setShowEmptyMessage(countItems < 1);
        }
    }, [showEmptyMessage, countItems]);

    const goToBasket = useCallback(() => {
        if (countItems > 0) {
            history('/basket');
        }
    }, [countItems]);

    return (
        <BasketPreviewWrapper onClick={goToBasket} onMouseOver={handleOnMouseAction} onMouseOut={handleOnMouseAction}>
            <SectionHeader>Корзина</SectionHeader>
            <StyledIcons size={23} className="icon-shopping-bag" />
           
            {countItems > 0 && (
                <BasketDetailsWrapper>
                    <BasketBodyText>{countItems}</BasketBodyText>
                </BasketDetailsWrapper>
            )}
            {showEmptyMessage && <MessageBlock>Ваша корзина пуста</MessageBlock>}
        </BasketPreviewWrapper>
    );
});
