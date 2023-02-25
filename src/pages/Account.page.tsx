import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { TitleText } from '../ui/text';
import { AccountMenu } from '../components/account/component/menu/account-menu.component';
import { geIsFetchingtUserDetails, getUser } from '../components/account/selectors';

const Wrapper = styled.div`
    display: flex;
    flex-grow: 1;
    background: #f5f6f8;
    padding: 30px 40px 40px 50px;

    @media (max-width: 850px) {
        flex-direction: column;
        padding: 20px 0 20px;
    }
`;

const MenuWrapper = styled.div`
    width: 300px;
    position: relative;

    @media (max-width: 850px) {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        box-sizing: border-box;
    }
`;

export const AccountTitle = styled(TitleText)`
    margin-bottom: 30px;
    margin-right: 10px;

    font-size: 30px;

    @media (max-width: 1040px) {
        font-size: 25px;
        margin-bottom: 20px;
    }

    @media (max-width: 850px) {
        font-size: 20px;
        margin-bottom: 15px;
        min-width: 200px;
        margin-left: 20px;
    }

    @media (max-width: 450px) {
        margin-bottom: 0px;
    }
`;

const ContentWrapper = styled.div<{ isCentered?: boolean }>`
    background: white;
    padding: 30px 30px;
    border-radius: 8px;
    -webkit-box-shadow: 2px 3px 20px 2px #8a8a8a33;
    box-shadow: 2px 3px 20px 2px #8a8a8a33;
    width: 80%;
    min-height: 80vh;
	box-sizing: border-box;

    ${(props) =>
        props.isCentered &&
        `
        display: flex;
        align-items: center;
    `}

    @media (max-width: 850px) { 
        width: 100%;
    }
}`;

const AccountPage: React.FC = React.memo(function AccountPage() {
    const userData = useSelector(getUser);
    const isFetching = useSelector(geIsFetchingtUserDetails);

    const history = useNavigate();

    useEffect(() => {
        if (!userData && !isFetching) {
            history('/');
        }
    }, [userData, history, isFetching]);

    return (
        <Wrapper>
            <MenuWrapper>
                <AccountTitle>Личный кабинет</AccountTitle>
                <AccountMenu />
            </MenuWrapper>
            <ContentWrapper isCentered={!userData}>
                <Outlet />
            </ContentWrapper>
        </Wrapper>
    );
});

export default AccountPage;
