import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { TOGGLE_AUTH_DRAWER } from '../actions';
import { getToken } from '../selectors';
import Login from './login.component';

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
    margin-top: 100px;
    cursor: pointer;
    padding: 20px;

    :hover {
        color: #7aa0a1;
    }
`;

interface LoginDrawerItemProps {
    toggleForms: () => void;
}

export const LoginDrawerItem: React.FC<LoginDrawerItemProps> = React.memo(function LoginDrawerItem({
    toggleForms,
}: LoginDrawerItemProps) {
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const history = useHistory();

    useEffect(() => {
        if (token) {
            dispatch(TOGGLE_AUTH_DRAWER({ isShow: false }));
            history.push('/account');
        }
    }, [token]);

    return (
        <RegisterFormWrapper>
            <Login />
            <TextButton onClick={toggleForms}>Еще нет аккаунта?</TextButton>
        </RegisterFormWrapper>
    );
});
