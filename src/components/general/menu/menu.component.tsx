import React, { useCallback, useEffect, useState } from 'react';
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

const MenuItemWrapper = styled.div`
`;

const SubLinksSection = styled.div`
    position: absolute;
    left: 0;
    display: flex;
    width: 100%;
    background: #ffff;
    z-index: 2;
    padding: 20px 50px;
    min-height: 230px;
    border-bottom: 1px solid #ebebeb;
    top: 180px;
    box-sizing: border-box;
`;

const MenuItemLabel = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.DARK })`
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

interface MenuConfig {
    name: string;
    url: string;
    subLinks?: MenuConfig[]
}

const menuConfig: MenuConfig[] = [
    {
        name: 'Каталог',
        url: '/catalog',
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
        ]
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
    // {
    //     name: 'сравнение товаров',
    //     url: '/match',
    // },
];

interface MenuItemProps {
    item: MenuConfig
    isShowSubLinks?: boolean
    setIsShowSubLinks: (i: boolean) => void
}

export const MenuItem: React.FC<MenuItemProps> = React.memo(function MenuItem({
    item,
    isShowSubLinks,
    setIsShowSubLinks
}: MenuItemProps) {
    const handleOnMouseParent = useCallback(() => {
        if (item.subLinks) {
            setIsShowSubLinks(true);
        } else {
            setIsShowSubLinks(false);
        }
    }, [item.subLinks, setIsShowSubLinks]);

    const handleOnMouseChild = useCallback(() => {
        setIsShowSubLinks(false);
    }, []);

    return (
        <MenuItemWrapper onMouseOver={handleOnMouseParent} onClick={handleOnMouseChild}>
           <StyledLink to={item.url}>
                <MenuItemLabel>{item.name}</MenuItemLabel>
            </StyledLink>

            {
                (item.subLinks && isShowSubLinks) && (
                    <SubLinksSection onMouseLeave={handleOnMouseChild} onClick={handleOnMouseChild}>
                        {item.subLinks.map((item, index: number) => (
                            <MenuItem setIsShowSubLinks={setIsShowSubLinks} item={item} key={`${item.name}-${index}`} />
                        ))}
                    </SubLinksSection>
                )
            }
        </MenuItemWrapper>
    );
});

export const Menu: React.FC = React.memo(function Menu() {
    const [isShowSubLinks, setIsShowSubLinks] = useState(false);

    const handleShowSubLinks = useCallback((value: boolean) => {
        setIsShowSubLinks(value);
    }, []);

    return (
        <MenuWrapper>
            {menuConfig.map((item, index: number) => (
                <MenuItem setIsShowSubLinks={handleShowSubLinks} isShowSubLinks={isShowSubLinks} item={item} key={`${item.name}-${index}`} />
            ))}
        </MenuWrapper>
    );
});
