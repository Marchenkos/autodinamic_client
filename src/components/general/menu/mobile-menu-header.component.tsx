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
import { MobileAccountPreview } from '../../account/component/mobile-account-preview.component';

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

const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 15px 20px;
    background: #ffffff;
    position: fixed;
    z-index: 5;
    width: 100%;
	box-sizing: border-box;

	border-bottom: 1.5px solid #ddddddcc;
`;

export const IconBarWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
`;

const menuConfig = [
    {
        name: 'акции',
        url: '/promotions',
        icon: <LoyaltyIcon style={{ color: 'white' }} />,
    },
    {
        name: 'каталог',
        url: '/catalog',
        icon: <FormatListBulletedIcon style={{ color: 'white' }} />,
    },
    {
        name: 'проверить заказ',
        url: '/check-order',
        icon: <LibraryAddCheckIcon style={{ color: 'white' }} />,
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

export const MobileMenuHeader: React.FC = React.memo(function MobileMenuHeader() {
    const classes = useStyles();
    const [state, setState] = useState(false);
    const userData = useSelector(getUser);
    const history = useHistory();

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
			<StyledLink
                to="/home"
                style={{ flexGrow: 1 }}
            >
                <LogoComponentWithText />
            </StyledLink>
            <MenuIcon onClick={toggleDrawer(true)} style={{ color: 'black', marginRight: '10px', marginTop: '4px' }} />

        </MenuWrapper>
    );
});
