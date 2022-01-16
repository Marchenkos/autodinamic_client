import React, { useMemo } from 'react';
import styled from 'styled-components';

import { IMenuConfig } from '../../constants';
import { AccountMenuItem } from './account-menu-item.component';

const Wrapper = styled.div`
    width: 87%;

    @media (max-width: 850px) {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        margin-top: 20px;
    }
`;

interface AccountMenuProps {
    menuConfig: IMenuConfig[];
}

export const AccountMenu: React.FC<AccountMenuProps> = React.memo(function AccountMenu({
    menuConfig,
}: AccountMenuProps) {
    const menuItems = useMemo(
        () =>
            menuConfig.map((item, index) => (
                <AccountMenuItem key={index} label={item.label} iconClass={item.iconClass} urlItem={item.url} />
            )),
        [menuConfig]
    );

    return <Wrapper>{menuItems}</Wrapper>;
});
