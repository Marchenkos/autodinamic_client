import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { TOGGLE_DRAWER } from '../../drawer/actions';

import { getToken } from '../selectors';
import Login from './login.component';

const RegisterFormWrapper = styled.div`
    margin-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LoginDrawerItem: React.FC = React.memo(function LoginDrawerItem() {
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    const history = useHistory();

    useEffect(() => {
        if (token) {
            dispatch(TOGGLE_DRAWER({ isShow: false }));
            history.push('/account');
        }
    }, [token]);

    return (
        <RegisterFormWrapper>
            <Login />
        </RegisterFormWrapper>
    );
});
