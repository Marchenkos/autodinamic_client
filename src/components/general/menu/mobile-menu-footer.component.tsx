import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import FaceIcon from '@material-ui/icons/Face';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import { StyledLink } from '../../../ui/styled-link.component';
import { BodyText } from '../../../ui/text';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../account/selectors';
import { SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { AuthDrawer } from '../../auth/components/auth-drawer.component';
import { TOGGLE_DRAWER } from '../../drawer/actions';

const MenuItemLink = styled(StyledLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MenuItemBlockLink = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MenuText = styled(BodyText)<{ isSelected?: boolean }>`
	font-size: 11px;
	margin-top: 3px;
	color: ${(props) => (props.isSelected ? '#8dc3b7' : 'gray')};
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

interface FooterMenuConfig {
    name: string;
    url: string;
    icon: (isSelected: boolean) => JSX.Element;
}

const menuConfig: FooterMenuConfig[] = [
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
        url: '/account/wishlist',
        icon: (isSelected: boolean) => <FavoriteIcon style={{ color: isSelected ? '#8dc3b7' : '#4a4a4a' }} />,
    },
];

interface MobileMenuFooterItemProps {
    item: FooterMenuConfig;
}

export const MobileMenuFooterItem: React.FC<MobileMenuFooterItemProps> = React.memo(function MobileMenuFooterItem({
    item,
}: MobileMenuFooterItemProps) {
    const history = useHistory();
    const userData = useSelector(getUser);
    const dispatch = useDispatch();

    const navigateToAccount = useCallback(() => {
        if (userData) {
            history.push('/account');
        } else {
            dispatch(
                TOGGLE_DRAWER({
                    isShow: true,
                    children: <AuthDrawer />,
                })
            );
        }
    }, [userData, history]);

    const navigateToWishlist = useCallback(() => {
        if (!userData) {
            dispatch(
                SHOW_SIMPLE_MODAL({
                    text: 'Пожалуйста войдите в свой аккаунт или зарегистрируйтесь, чтобы перейти к избранным товарам',
                })
            );
        } else {
            history.push('/account/wishlist');
        }
    }, [userData, history]);

    if (item.name === 'Избранное') {
        return (
            <MenuItemBlockLink onClick={navigateToWishlist}>
                {item.icon(location.pathname.includes(item.url))}
                <MenuText isSelected={location.pathname.includes(item.url)}>{item.name}</MenuText>
            </MenuItemBlockLink>
        );
    }

    if (item.name === 'Кабинет') {
        return (
            <MenuItemBlockLink onClick={navigateToAccount}>
                {item.icon(location.pathname.includes(item.url))}
                <MenuText isSelected={location.pathname.includes(item.url)}>{item.name}</MenuText>
            </MenuItemBlockLink>
        );
    }

    return (
        <MenuItemLink to={item.url}>
            {item.icon(location.pathname.includes(item.url))}
            <MenuText isSelected={location.pathname.includes(item.url)}>{item.name}</MenuText>
        </MenuItemLink>
    );
});

export const MobileMenuFooter: React.FC = React.memo(function MobileMenuFooter() {
    const location = useLocation();

    const menuContent = useMemo(
        () => menuConfig.map((item, index: number) => <MobileMenuFooterItem key={index} item={item} />),
        [menuConfig, location.pathname]
    );

    return <MenuWrapper>{menuContent}</MenuWrapper>;
});
