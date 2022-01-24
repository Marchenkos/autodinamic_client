import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { StyledIcons } from '../../../ui/styled-icon.component';

import { TOGGLE_AUTH_DRAWER } from '../actions';
import { getIsAutoLoggedIn, getIsRegistered } from '../selectors';
import Registration from './registration.component';

const RegisterFormWrapper = styled.div`
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const TextButton = styled.button`
    border: none;
    background: none;
    font-size: 16px;
    font-family: 'Manrope';
    margin-top: 50px;
    cursor: pointer;
    padding: 20px;

    :hover {
        color: #7aa0a1;
    }
`;

interface RegisterDrawerItemProps {
    toggleForms: () => void;
}

export const RegisterDrawerItem: React.FC<RegisterDrawerItemProps> = React.memo(function RegisterDrawerItem({
    toggleForms,
}: RegisterDrawerItemProps) {
    const dispatch = useDispatch();
    const isAutoLogged = useSelector(getIsAutoLoggedIn);
    const isRegistered = useSelector(getIsRegistered);
    const history = useHistory();

    useEffect(() => {
        if (isAutoLogged && isRegistered) {
            dispatch(TOGGLE_AUTH_DRAWER({ isShow: false }));
            history.push('/account');
        }

        if (!isAutoLogged && isRegistered) {
            toggleForms();
        }
    }, [isAutoLogged, isRegistered]);

    return (
        <RegisterFormWrapper>
            <Registration />
        </RegisterFormWrapper>
    );
});
