import React from 'react';
import styled from 'styled-components';

import { StyledLink } from '../../../ui/styled-link.component';
import { BodyText, TextSize, TextColor } from '../../../ui/text';
import { capitalizeString } from '../../filter/utilites/formated-string';

const MenuWrapper = styled.div`
    margin-top: 25px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
`;

const MenuItem = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.DARK })`
    margin-right: 35px;
    padding: 0 0 10px;
    border-bottom: none;
    box-sizing: border-box;
    border-bottom: 2px solid #ffff;

    &:focus, &:hover, &:visited, &:link, &:active {
        border-bottom: 2px solid #363636;
    }

    @media (max-width: 1200px) {
        font-size: 14px;
    }
}`;

const menuConfig = [
    {
        name: 'Каталог',
        url: '/catalog/all',
    },
    {
        name: 'Новинки',
        url: '/new/all',
    },
    {
        name: 'Акции',
        url: '/promotions',
    },
    {
        name: 'Проверить заказ',
        url: '/check-order',
    },

    {
        name: 'Доставка',
        url: '/delivery',
    },

    {
        name: 'Наш магазин',
        url: '/contacts',
    },
    // {
    //     name: 'сравнение товаров',
    //     url: '/match',
    // },
];

export const Menu: React.FC = React.memo(function Menu() {
    return (
        <MenuWrapper>
            {menuConfig.map((item, index: number) => (
                <StyledLink key={index} to={item.url}>
                    <MenuItem>{capitalizeString(item.name)}</MenuItem>
                </StyledLink>
            ))}
        </MenuWrapper>
    );
});
