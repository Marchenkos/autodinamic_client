import React from 'react';
import styled from 'styled-components';

import { StyledLink } from '../../../ui/styled-link.component';
import { BodyText, TextSize, TextColor } from '../../../ui/text';
import { capitalizeString } from '../../filter/utilites/formated-string';

const MenuItem = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.WHITE })`
    margin-right: 35px;
    padding: 1px 0;
    text-transform: lowercase;
    padding: 20px 0;
    border-bottom: none;
    box-sizing: border-box;
    border-bottom: 2px solid #363636;

    &:focus, &:hover, &:visited, &:link, &:active {
        border-bottom: 2px solid white;
    }

    @media (max-width: 1200px) {
        font-size: 14px;
    }
}`;

const menuConfig = [
    {
        name: 'каталог',
        url: '/catalog/all',
    },
    {
        name: 'новинки',
        url: '/new/all',
    },
    {
        name: 'акции',
        url: '/promotions',
    },
    {
        name: 'проверить заказ',
        url: '/check-order',
    },

    {
        name: 'доставка',
        url: '/delivery',
    },

    {
        name: 'наш магазин',
        url: '/contacts',
    },
    // {
    //     name: 'сравнение товаров',
    //     url: '/match',
    // },
];

export const Menu: React.FC = React.memo(function Menu() {
    return (
        <>
            {menuConfig.map((item, index: number) => (
                <StyledLink key={index} to={item.url}>
                    <MenuItem>{capitalizeString(item.name)}</MenuItem>
                </StyledLink>
            ))}
        </>
    );
});
