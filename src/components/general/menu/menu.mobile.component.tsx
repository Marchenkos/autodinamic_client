import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HomeIcon from '@material-ui/icons/Home';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { BasketPreview } from '../../checkout/basket/components/basket-preview.component';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CompareIcon from '@material-ui/icons/Compare';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

import { LogoComponentWithText } from '../components/logo-text.component';
import { StyledLink } from '../../../ui/styled-link.component';
import { capitalizeString } from '../../filter/utilites/formated-string';
import { BodyText, TextSize, TextColor, TextWeight } from '../../../ui/text';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUser } from '../../account/selectors';

const MenuItemLink = styled(StyledLink)`
    display: flex;
    padding: 20px 0 20px 40px;

    &:hover {
        background: #48b3b3;
    }
`;

const CloseButton = styled(CloseIcon)`
    position: absolute;
    color: white;
    top: 18px;
    right: 32px;
`;

const MenuText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.LIGHT })`
    padding: 1px 0;
    margin-left: 15px;
}`;

const drawerWidth = 280;

const useStyles = makeStyles({
    list: {
        width: 500,
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        width: 0,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        '@media (max-width: 780px)': {
            width: '100%',
        },
        background: '#121721',
        paddingTop: '50px',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 18px',
        justifyContent: 'flex-start',
    },
});

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 15px 20px;
    background: ${(props) => props.theme.colors.background.dark};
    position: fixed;
    z-index: 5;
    width: 100%;
`;

export const IconBarWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
`;

const StyledPersonIcon = styled(PersonIcon)`
    color: white;
    margin-right: 10px;
    margin-top: 4px;

    @media (max-width: 850px) {
        margin-top: 0;
    }
`;

const menuConfig = [
    {
        name: 'главная',
        url: '/',
        icon: <HomeIcon style={{ color: 'white' }} />,
    },
    {
        name: 'акции',
        url: '/news',
        icon: <LoyaltyIcon style={{ color: 'white' }} />,
    },
    {
        name: 'каталог',
        url: '/catalog/all',
        icon: <FormatListBulletedIcon style={{ color: 'white' }} />,
    },
    {
        name: 'проверить заказ',
        url: '/check-order',
        icon: <LibraryAddCheckIcon style={{ color: 'white' }} />,
    },
    {
        name: 'сравнить товары',
        url: '/compare',
        icon: <CompareIcon style={{ color: 'white' }} />,
    },
    {
        name: 'доставка',
        url: '/delivery',
        icon: <LocalShippingIcon style={{ color: 'white' }} />,
    },
    {
        name: 'контакты',
        url: '/contacts',
        icon: <RecentActorsIcon style={{ color: 'white' }} />,
    },
];

export const MenuMobile: React.FC = React.memo(function Menu() {
    const classes = useStyles();
    const [state, setState] = useState(false);
    const userData = useSelector(getUser);
    const history = useHistory();
    const dispatch = useDispatch();

    const navigateToAccount = useCallback(() => {
        history.push('/account');
    }, [userData, history]);

    const toggleDrawer = (value: boolean) => (event: any) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(value);
    };

    const menuContent = useMemo(
        () =>
            menuConfig.map((item, index: number) => (
                <MenuItemLink key={index} to={item.url} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    {item.icon}
                    <MenuText>{capitalizeString(item.name)}</MenuText>
                </MenuItemLink>
            )),
        [menuConfig]
    );

    return (
        <MenuWrapper>
            <React.Fragment key="left">
                <SwipeableDrawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    open={state}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    <CloseButton onClick={toggleDrawer(false)} />
                    {menuContent}
                </SwipeableDrawer>
            </React.Fragment>
            <MenuIcon onClick={toggleDrawer(true)} style={{ color: 'white', marginRight: '10px', marginTop: '4px' }} />
            <StyledLink
                to="/home"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
            >
                <LogoComponentWithText />
            </StyledLink>
            <IconBarWrapper>
                <StyledPersonIcon onClick={navigateToAccount} />
                <BasketPreview />
            </IconBarWrapper>
        </MenuWrapper>
    );
});
