import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { StyledIcons } from '../../../ui/styled-icon.component';
import { BodyText, TextColor } from '../../../ui/text';
import { TOGGLE_AUTH_DRAWER } from '../../auth/actions';
import { SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { getUser } from '../selectors';

const Section = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    background: none;
    padding: 15px 10px;
    box-sizing: border-box;

    :hover {
        background: #7aa0a1;
    }
`;

const SectionHeader = styled(BodyText).attrs({ color: TextColor.WHITE })`
    font-family: 'Manrope';
    font-size: 14px;
`;

export const AccountPreview: React.FC = React.memo(function AccountPreview() {
    const history = useHistory();
    const userData = useSelector(getUser);
    const dispatch = useDispatch();

    const navigateToAccount = useCallback(() => {
        if (userData) {
            history.push('/account');
        } else {
            dispatch(TOGGLE_AUTH_DRAWER({ isShow: true }));
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

    return (
        <>
        <Section onClick={navigateToWishlist}>
            <StyledIcons mainColor='#fff' onHoverColor='#fff' className="icon-heart-o" />
            <SectionHeader>Избранное</SectionHeader>
        </Section>
        <Section onClick={navigateToAccount}>
            <StyledIcons mainColor='#fff' onHoverColor='#fff' className="icon-account_circle" />
            <SectionHeader>Аккаунт</SectionHeader>
        </Section>
        </>
    );
});
