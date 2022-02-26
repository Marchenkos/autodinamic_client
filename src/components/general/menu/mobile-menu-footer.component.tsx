import React, { useMemo } from 'react';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import FaceIcon from '@material-ui/icons/Face';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { StyledLink } from '../../../ui/styled-link.component';
import { BodyText } from '../../../ui/text';
import { useLocation } from 'react-router-dom';

const MenuItemLink = styled(StyledLink)`
    display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const MenuText = styled(BodyText)<{ isSelected?: boolean }>`
	font-size: 11px;
	margin-top: 3px;
	color: ${(props) => props.isSelected ? '#8dc3b7' : 'gray'};
}`;

const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
	justify-content: space-between;

    position: fixed;
	bottom: 0;
    z-index: 5;
    width: 100%;

	background: #fbfbfb;
    border-top: 1px solid #efefef;

	padding: 7px 20px;
    box-sizing: border-box;
`;

const menuConfig = [
    {
        name: 'Главная',
        url: '/home',
        icon: (isSelected: boolean) => <HomeIcon style={{ color: isSelected ? '#8dc3b7' : '#4a4a4a' }} />,
    },
    {
        name: 'Каталог',
        url: '/catalog',
        icon: (isSelected: boolean) => <FormatListBulletedIcon style={{ color: isSelected ? '#8dc3b7' : '#4a4a4a' }} />,
    },
	{
        name: 'Кабинет',
        url: '/account',
        icon: (isSelected: boolean) => <FaceIcon style={{ color: isSelected ? '#8dc3b7' : '#4a4a4a' }} />,
    },
	{
        name: 'Избранное',
        url: '/catalog11',
        icon: (isSelected: boolean) => <FavoriteIcon style={{ color: isSelected ? '#8dc3b7' : '#4a4a4a' }} />,
    },
    {
        name: 'Корзина',
        url: '/basket',
        icon: (isSelected: boolean) => <ShoppingBasketIcon style={{ color: isSelected ? '#8dc3b7' : '#4a4a4a' }} />,
    },
];

export const MobileMenuFooter: React.FC = React.memo(function MobileMenuFooter() {
	const location = useLocation();

	const menuContent = useMemo(
        () =>
            menuConfig.map((item, index: number) => (
                <MenuItemLink key={index} to={item.url}>
                    {item.icon(location.pathname.includes(item.url))}
                    <MenuText isSelected={location.pathname.includes(item.url)}>{item.name}</MenuText>
                </MenuItemLink>
            )),
        [menuConfig, location.pathname]
    );

    return (
        <MenuWrapper>
			{menuContent}
        </MenuWrapper>
    );
});
