import React from 'react';
import styled from 'styled-components';

import { BasketPreview } from '../checkout/basket/components/basket-preview.component';
import { BodyLink, TextColor, TextWeight } from '../../ui/text';
import { Menu } from './menu/menu.component';
import { LogoComponentWithText } from './components/logo-text.component';
import { AccountPreview } from '../account/component/account-preview.component';
import { SearchInput } from '../search/components/search-input.component';

const HeaderWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    position: relative;

    @media (max-width: 800px) {
        display: none;
    }
`;

const HeaderSection = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    box-sizing: border-box;
`;

const FirstHeaderSection = styled(HeaderSection)`
    padding: 0 50px;
    background: #464646;
    justify-content: space-between;
`;

const SecondHeaderSection = styled(HeaderSection)`
    background: #ffff;
    justify-content: flex-start;
    padding: 20px 50px 0;
`;

const AccountPreviewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ContactBodyLink = styled(BodyLink).attrs({ weight: TextWeight.BOLD, color: TextColor.BLUE })`
    font-family: 'Manrope';
    font-size: 14px;
`;

export const Header: React.FC = React.memo(function Header() {
    return (
        <HeaderWrapper>
            <FirstHeaderSection>
                <ContactBodyLink href="tel:+375 29 660-39-59">+375 29 660-39-59</ContactBodyLink>

                <AccountPreviewWrapper>
                    <AccountPreview />
                </AccountPreviewWrapper>
            </FirstHeaderSection>

            <SecondHeaderSection>
                <LogoWrapper>
                    <LogoComponentWithText />
                </LogoWrapper>
                <SearchInput />
                <BasketPreview />
            </SecondHeaderSection>

            <Menu />
        </HeaderWrapper>
    );
});
