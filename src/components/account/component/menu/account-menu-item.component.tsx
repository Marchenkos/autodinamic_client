import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { StyledIcons } from '../../../../ui/styled-icon.component';
import { StyledLink } from '../../../../ui/styled-link.component';
import { getDeviceSize } from '../../../../utils/check-device-size';
import { LOG_OUT } from '../../../auth/actions';

const MenuItem = styled.div`
    display: flex;
    cursor: pointer;
    border-radius: 2px;
    margin: 6px 0;
    padding: 10px 5px;
    background: none;

    &:hover {
        background: #dee3e8;
    }

    @media (max-width: 850px) {
        margin: 0px 6px;
    }

    @media (max-width: 450px) {
        margin: 0 6px 0 0;
    }
`;

const LogoutMenuItem = styled(MenuItem)`
    margin-top: 20px;

    @media (max-width: 850px) {
        margin-top: 0px;
    }

    @media (max-width: 700px) {
        position: absolute;
        top: 0;
        right: 0;
        flex-direction: row;
    }
`;

const ItemWrapper = styled.div<{ isLogout?: boolean }>`
    display: flex;
    align-items: center;

    @media (max-width: 850px) {
        flex-direction: column;
    }

    @media (max-width: 700px) {
        ${(props) =>
            props.isLogout &&
            `
            flex-direction: row-reverse;
            min-width: 70px;
            justify-content: space-between;
            right: 20px;
        `}
    }
`;

const MenuLabel = styled.div<{ isSelected?: boolean; isLogout?: boolean }>`
    font-family: 'Manrope';
    text-decoration: none !important;
    margin-left: 7px;
    font-size: 15px;
    color: ${(props) => (props.isSelected ? '#50a7a7;' : '#7b7b7b')};

    @media (max-width: 1440px) {
        font-size: 14px;
    }

    @media (max-width: 850px) {
        margin-left: 0;
        text-align: center;
        font-size: 11px;
        margin-top: 5px;
    }

    @media (max-width: 700px) {
        ${(props) =>
            props.isLogout &&
            `
            margin-top: 0;
        `}
    }
`;

interface AccountMenuItemProps {
    label: string;
    urlItem: string;
    iconClass: string;
}

export const AccountMenuItem: React.FC<AccountMenuItemProps> = React.memo(function AccountMenuItem({
    label,
    urlItem,
    iconClass,
}: AccountMenuItemProps) {
    let { url } = useRouteMatch();
    const dispatch = useDispatch();
    const history = useNavigate();
    const location = useLocation();
    const deviceSize = getDeviceSize();

    const isSelected = useMemo(() => location.pathname.includes(urlItem), [location, url]);

    const handleLogOut = useCallback(() => {
        dispatch(LOG_OUT.TRIGGER());

        history('/home');
    }, [dispatch, history]);

    if (urlItem === '0') {
        return (
            <LogoutMenuItem onClick={handleLogOut}>
                <ItemWrapper isLogout>
                    {deviceSize > 400 && <StyledIcons className={iconClass} />}
                    <MenuLabel isLogout isSelected={isSelected}>
                        {label}
                    </MenuLabel>
                </ItemWrapper>
            </LogoutMenuItem>
        );
    }

    return (
        <MenuItem>
            <StyledLink style={{ width: '100%' }} to={`${url}/${urlItem}`}>
                <ItemWrapper>
                    <StyledIcons className={iconClass} />
                    <MenuLabel isSelected={isSelected}>{label}</MenuLabel>
                </ItemWrapper>
            </StyledLink>
        </MenuItem>
    );
});
