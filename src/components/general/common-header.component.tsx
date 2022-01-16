import React from 'react';
import styled from 'styled-components';

import { MenuMobile } from './menu/menu.mobile.component';
import { BasketPreview } from '../checkout/basket/components/basket-preview.component';
import { BodyLink, TextColor, TextWeight } from '../../ui/text';
import { Menu } from './menu/menu.component';
import { getDeviceSize } from '../../utils/check-device-size';
import { LogoComponentWithText } from './components/logo-text.component';
import { SearchMobile } from '../search/components/search-mobile.component';
import { AccountPreview } from '../account/component/account-preview.component';
import { Search } from '../search/components/search.component';

const CommonHeaderWrapper = styled.div`
    width: 100%;
`;

const MenuSectionWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    padding: ${(props: { white?: boolean }) => (props.white ? '15px 50px' : '10px 50px')};

    background: ${(props: { white?: boolean }) => (props.white ? '#272727' : '#F1F1F1')};
`;

const FirstMenu = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 10px 50px;
    background: #fff;
    box-sizing: border-box;
    justify-content: flex-start;
`;

const SecondMenu = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: #363636;
`;

const FirstMenuIconsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 50px;
`;

const ContactBodyLink = styled(BodyLink).attrs({ weight: TextWeight.BOLD, color: TextColor.BLUE })`
    font-family: 'Manrope';
    font-size: 14px;
`;

export const CommonHeader: React.FC = React.memo(function CommonHeader() {
    const isMobile = getDeviceSize();

    if (isMobile < 850) {
        return (
            <>
                <MenuMobile />
                <SearchMobile />
            </>
        );
    }

    return (
        <>
            <CommonHeaderWrapper>
                <FirstMenu>
                    <ContactBodyLink href="tel:+375 29 660-39-59">+375 29 660-39-59</ContactBodyLink>
                    <LogoWrapper>
                        <LogoComponentWithText />
                    </LogoWrapper>
                    <FirstMenuIconsWrapper>
                        <Search />
                        <AccountPreview />
                        <BasketPreview />
                    </FirstMenuIconsWrapper>
                </FirstMenu>
                <SecondMenu>
                    <Menu />
                </SecondMenu>
            </CommonHeaderWrapper>
        </>
    );
});
