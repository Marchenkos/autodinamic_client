import React from 'react';
import styled from 'styled-components';

import { MobileMenuHeader } from './menu/mobile-menu-header.component';
import { BasketPreview } from '../checkout/basket/components/basket-preview.component';
import { BodyLink, TextColor, TextWeight } from '../../ui/text';
import { Menu } from './menu/menu.component';
import { getDeviceSize } from '../../utils/check-device-size';
import { LogoComponentWithText } from './components/logo-text.component';
import { SearchMobile } from '../search/components/search-mobile.component';
import { AccountPreview } from '../account/component/account-preview.component';
import { SearchInput } from '../search/components/search-input.component';
import { MobileMenuFooter } from './menu/mobile-menu-footer.component';

const CommonHeaderWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 10px;
    position: relative;

	@media (max-width: 800px) {
		display: none;
	}
`;

const MobileMenuWrapper = styled.div`
	display: none;

	@media (max-width: 800px) {
		display: block;
	}
`;

const FirstMenu = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 50px;
    background: #464646;
    box-sizing: border-box;
    justify-content: space-between;
`;

const SecondMenu = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 50px 0;
    width: 100%;
    background: #ffff;
    box-sizing: border-box;
`;

const SecondMenuSection = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
`;

const FirstMenuIconsWrapper = styled.div`
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

export const CommonHeader: React.FC = React.memo(function CommonHeader() {
    return (
		<>
        <CommonHeaderWrapper>
            <FirstMenu>
                <ContactBodyLink href="tel:+375 29 660-39-59">+375 29 660-39-59</ContactBodyLink>
            
                <FirstMenuIconsWrapper>
                    <AccountPreview />
                </FirstMenuIconsWrapper>
            </FirstMenu>
            <SecondMenu>
                <SecondMenuSection>
                    <LogoWrapper>
                        <LogoComponentWithText />
                    </LogoWrapper>
                    <SearchInput />
                    <BasketPreview />
                </SecondMenuSection>

                <SecondMenuSection>
                    <Menu />
                </SecondMenuSection>
            </SecondMenu>
        </CommonHeaderWrapper>
		<MobileMenuWrapper>
 			<MobileMenuHeader />
			<MobileMenuFooter />
		</MobileMenuWrapper>
		</>
    );
});
