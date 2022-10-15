import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StyledIcons } from '../../../ui/styled-icon.component';
import { TOGGLE_DRAWER } from '../../drawer/actions';

import { getIsAutoLoggedIn, getIsRegistered } from '../selectors';
import Registration from './registration.component';

const RegisterFormWrapper = styled.div`
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (max-width: 800px) {
        margin-top: 100px;
    }
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
    const history = useNavigate();

    useEffect(() => {
        if (isAutoLogged && isRegistered) {
            dispatch(TOGGLE_DRAWER({ isShow: false }));
            history('/account');
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
