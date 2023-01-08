import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { StyledIcons } from '../../../ui/styled-icon.component';

import { TOGGLE_DRAWER } from '../../drawer/actions';
import { LoginDrawerItem } from './login-drawer-item.component';
import { RegisterDrawerItem } from './register-drawer-item.component';

const ContentWrapper = styled.div`
    @media (max-width: 900px) {
        margin-top: 70px;
    }

    @media (max-width: 800px) {
        margin-top: 20px;
    }
`;

const QuestionButtonWrapper = styled.div`
    position: absolute;
    top: 20px;
    left: 50px;
`;

const TextButton = styled.button`
    border: none;
    background: none;
    font-size: 16px;
    font-family: 'Manrope';
    cursor: pointer;
    padding: 10px 20px;

    :hover {
        color: #7aa0a1;
    }
`;

export const AuthDrawer: React.FC = React.memo(function AuthDrawer() {
    const dispatch = useDispatch();
    const [isRegisterForm, setRegisterForm] = useState(false);

    const toggleForms = useCallback(() => {
        setRegisterForm((prev) => !prev);
    }, []);

    const renderForm = useMemo(() => {
        if (isRegisterForm) {
            return <RegisterDrawerItem toggleForms={toggleForms} />;
        }
        return <LoginDrawerItem />;
    }, [isRegisterForm, toggleForms]);

    const toggleAuthDrawer = useCallback(() => {
        dispatch(TOGGLE_DRAWER({ isShow: false }));
    }, [dispatch]);

    return (
        <>
            <QuestionButtonWrapper>
                <TextButton onClick={toggleForms}>
                    {isRegisterForm ? 'Уже зарегистрированы?' : 'Еще нет аккаунта?'}
                </TextButton>
            </QuestionButtonWrapper>
            <ContentWrapper>{renderForm}</ContentWrapper>
        </>
    );
});
