import { Drawer } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { StyledIcons } from '../../../ui/styled-icon.component';

import { TOGGLE_AUTH_DRAWER } from '../actions';
import { getIsShowAuthDrawer } from '../selectors';
import { LoginDrawerItem } from './login-drawer-item.component';
import Login from './login.component';
import { RegisterDrawerItem } from './register-drawer-item.component';
import Registration from './registration.component';

const CloseButtonWrapper = styled.div`
    position: absolute;
    top: 20px;
    right: 50px;
`;

const LoginFormWrapper = styled.div`
    margin-top: 210px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const RegisterFormWrapper = styled(LoginFormWrapper)`
    margin-top: 150px;
`;

const TextButton = styled.button<{ smallMargin?: boolean }>`
    border: none;
    background: none;
    font-size: 16px;
    font-family: 'Manrope';
    margin-top: ${(props) => (props.smallMargin ? 50 : 100)}px;
    cursor: pointer;
    padding: 20px;

    :hover {
        color: #7aa0a1;
    }
`;

export const AuthDrawer: React.FC = React.memo(function AuthDrawer() {
    const dispatch = useDispatch();

    const isShowAuthDrawer = useSelector(getIsShowAuthDrawer);
    const [isRegisterForm, setRegisterForm] = useState(false);

    const toggleForms = useCallback(() => {
        setRegisterForm((prev) => !prev);
    }, []);

    const renderForm = useMemo(() => {
        if (isRegisterForm) {
            return <RegisterDrawerItem toggleForms={toggleForms} />;
        }
        return <LoginDrawerItem toggleForms={toggleForms} />;
    }, [isRegisterForm, toggleForms]);

    const toggleAuthDrawer = useCallback(() => {
        dispatch(TOGGLE_AUTH_DRAWER({ isShow: false }));
    }, [dispatch]);

    return (
        <Drawer
            PaperProps={{ style: { width: '50%' } }}
            anchor="right"
            open={isShowAuthDrawer}
            onClose={toggleAuthDrawer}
        >
            <CloseButtonWrapper>
                <StyledIcons className="icon-close" size={30} onClick={toggleAuthDrawer} />
            </CloseButtonWrapper>
            {renderForm}
        </Drawer>
    );
});
