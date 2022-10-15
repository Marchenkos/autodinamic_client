import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { StyledLink } from '../../../ui/styled-link.component';
import { BodyText, TextSize, TextColor } from '../../../ui/text';
import { capitalizeString } from '../../filter/utilites/formated-string';
import { Catalog } from '../../product-list/screens/catalog.component';

const MenuWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
`;

const MenuItemDropdown = styled.div`
    position: relative;
    display: inherit;
    &:hover .dropdown-content {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`;

const MenuItemDropdownContent = styled.div`
    position: absolute;
    background-color: #f9f9f9;
    overflow: hidden;
    border-radius: 0px 0px 6px 6px;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: none;
    left: -450px;
    top: 50px;
`;

const StyledMenuItemText = styled(StyledLink).attrs({ color: TextColor.DARK })`
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
  font-size: 16px;
  box-sizing: border-box;
  

  :before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0%;
    height: 1.4px;
    width: 0%;
    border-radius: 2px;
    background-color: black;
    transition: all ease-in-out 300ms;  
  }

    &:focus:before, &:hover:before {
        // border-bottom: 2px solid black;
        width: 100%;
    }
}`;

interface MenuConfig {
    name: string;
    url: string;
    component?: React.ReactNode;
    subLinks?: MenuConfig[];
}

const menuConfig: MenuConfig[] = [
    {
        name: 'Каталог',
        url: '/catalog/magnitols',
        component: <Catalog />,
        subLinks: [
            {
                name: 'Магнитолы',
                url: '/catalog/magnitols',
            },
            {
                name: 'Автоакустика',
                url: '/catalog/sound_speakers',
            },
            {
                name: 'Сабвуферы',
                url: '/catalog/subwoofers',
            },
            {
                name: 'Видеорегистраторы',
                url: '/catalog/dvrs',
            },
            {
                name: 'Сигнализация',
                url: '/catalog/signalisation',
            },
            {
                name: 'Усилители звука',
                url: '/catalog/auto_amplifiers',
            },
        ],
    },
    // {
    //     name: 'Новинки',
    //     url: '/new/all',
    // },
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

];

interface MenuItemProps {
    item: MenuConfig;
}

export const MenuItem: React.FC<MenuItemProps> = React.memo(function MenuItem({ item }: MenuItemProps) {
    if (!item.subLinks || item.subLinks.length < 0) {
        return <StyledMenuItemText to={item.url}>{item.name}</StyledMenuItemText>;
    }

    return (
        <MenuItemDropdown>
            <StyledMenuItemText to={item.url}>{item.name}</StyledMenuItemText>
            <MenuItemDropdownContent className="dropdown-content">
                {item.component
                    ? item.component
                    : item.subLinks.map((subLink, index) => (
                          <MenuItem item={subLink} key={`${subLink.name}-${index}`} />
                      ))}
            </MenuItemDropdownContent>
        </MenuItemDropdown>
    );
});

export const Menu: React.FC = React.memo(function Menu() {
    const menuContent = useMemo(() => 
      menuConfig.map((item, index: number) => <MenuItem item={item} key={`${item.name}-${index}`} />
    ), [menuConfig]);

    return <MenuWrapper>{menuContent}</MenuWrapper>;
});
