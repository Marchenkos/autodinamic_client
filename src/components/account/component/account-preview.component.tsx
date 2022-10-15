import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { StyledIcons } from '../../../ui/styled-icon.component';
import { BodyText, TextColor } from '../../../ui/text';
import { AuthDrawer } from '../../auth/components/auth-drawer.component';
import { TOGGLE_DRAWER } from '../../drawer/actions';
import { SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { getUser } from '../selectors';

const Section = styled.div`
    display: flex;
    cursor: pointer;
    // background: none;
    padding: 15px 20px 15px 5px;
    box-sizing: border-box;
    border-radius: 4px;
    :hover {
        background: #7aa0a1;
    }
    :active {
        background: #89adad;
    }
    
`;

const SectionHeader = styled(BodyText).attrs({ color: TextColor.WHITE })`
    font-family: 'Manrope';
    font-size: 14px;
`;

export const AccountPreview: React.FC = React.memo(function AccountPreview() {
    const history = useNavigate();
    const userData = useSelector(getUser);
    const dispatch = useDispatch();

    const navigateToAccount = useCallback(() => {
        if (userData) {
            history('/account');
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
            history('/account/wishlist');
        }
    }, [userData, history]);

    return (
        <>
            <Section onClick={navigateToWishlist}>
                <StyledIcons  mainColor="#fff" hoveredColor="#f7f2f2" className="icon-heart-o" />
                <SectionHeader>Избранное</SectionHeader>
            </Section>
            <Section onClick={navigateToAccount}>
                <StyledIcons mainColor="#fff" hoveredColor="#f7f2f2" className="icon-account_circle" />
                <SectionHeader>Аккаунт</SectionHeader>
            </Section>
        </>
    );
});
