import React from 'react';
import styled from 'styled-components';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { TextSize, BodyText, TextWeight } from '../../../../ui/text';
import { StyledLink } from '../../../../ui/styled-link.component';
import { getDeviceSize, isSmallDevice } from '../../../../utils/check-device-size';
import { getBasketItemsCount } from '../selectors';
import { useSelector } from 'react-redux';
import { StyledIcons } from '../../../../ui/styled-icon.component';

const BasketPreviewWrapper = styled.div`
    display: flex;
    position: relative;
`;

const BasketDetailsWrapper = styled.div<{ isSmall?: boolean }>`
    position: absolute;
    background: black;
    width: 22px;
    height: 22px;
    justify-content: center;
    display: flex;
    border-radius: 20px;
    align-items: center;
    top: -6px;
    right: 2px;
`;

const BasketBodyText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL })`
    padding: 1px 0;
    font-size: 11px;
    color: #ffffff;
`;

export const BasketPreview: React.FC = React.memo(function BasketPreview() {
    const countItems = useSelector(getBasketItemsCount);
    const isSmall = isSmallDevice();
    const isMobile = getDeviceSize();
    let color = '#5cacad';

    if (isMobile < 850) {
        color = 'white';
    }

    return (
        <StyledLink to="/basket">
            <BasketPreviewWrapper>
                <StyledIcons className="icon-shopping-bag" />
                <BasketDetailsWrapper isSmall={isSmall}>
                    {countItems > 0 && <BasketBodyText>{countItems}</BasketBodyText>}
                </BasketDetailsWrapper>
            </BasketPreviewWrapper>
        </StyledLink>
    );
});
