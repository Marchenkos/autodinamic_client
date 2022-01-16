import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { StyledIcons } from '../../../ui/styled-icon.component';
import { TOGGLE_AUTH_DRAWER } from '../../auth/actions';
import { SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { getUser } from '../selectors';

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
            <StyledIcons onClick={navigateToWishlist} className="icon-heart-o" />
            <StyledIcons onClick={navigateToAccount} size={24} className="icon-account_circle" />
        </>
    );
});
