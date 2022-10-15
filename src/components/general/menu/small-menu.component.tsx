import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { StyledLink } from '../../../ui/styled-link.component';
import { BodyText, TextSize, TextColor, TextWeight } from '../../../ui/text';
import { getUser } from '../../account/selectors';
import { HIDE_FORM_MODAL, SHOW_FORM_MODAL } from '../../modal/actions';

const MenuWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
`;

const VerticalSeparator = styled.div`
    width: 1.5px;
    background: #e6e4e4;
    margin: 0 10px;
`;

const SmallMenuTitle = styled(BodyText).attrs({
    size: TextSize.EXTRA_EXTRA_SMALL,
    weight: TextWeight.MEDIUM,
    color: TextColor.DARK,
})`
    padding: 1px 0;
    cursor: pointer;

    &:hover {
        color: #a2a2a2;
    }
`;

export const SmallMenu: React.FC = React.memo(function SmallMenu() {
    const userData = useSelector(getUser);
    const history = useNavigate();
    const dispatch = useDispatch();

    const navigateToAccount = useCallback(() => {
        if (userData) {
            history('/account');
        } else {
            history('/account/login');
        }
    }, [userData, history]);

    return (
        <MenuWrapper>
            <StyledLink to="/contacts">
                <SmallMenuTitle>Контакты</SmallMenuTitle>
            </StyledLink>
            <VerticalSeparator />
            <StyledLink to="/delivery">
                <SmallMenuTitle>Доставка</SmallMenuTitle>
            </StyledLink>
            <VerticalSeparator />
            <SmallMenuTitle onClick={navigateToAccount}>{userData ? 'Аккаунт' : 'Вход'}</SmallMenuTitle>
        </MenuWrapper>
    );
});
