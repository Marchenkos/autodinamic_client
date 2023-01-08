import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AccountMenuItem } from './account-menu-item.component';
import { IMenuConfig, accountMenuConfig } from './account-menu-config';


const Wrapper = styled.div`
    width: 87%;

    @media (max-width: 850px) {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        margin-top: 40px;
    }
`;



export const AccountMenu: React.FC = React.memo(function AccountMenu() {


    const menuItems = useMemo(
        () =>
        accountMenuConfig.map((item, index) => (
                <AccountMenuItem  key={index} label={item.label} iconClass={item.iconClass} urlItem={item.url} />
            )),
        [accountMenuConfig]
    );

    return <Wrapper>{menuItems}</Wrapper>;
});
