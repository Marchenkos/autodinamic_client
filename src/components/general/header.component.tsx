import React from 'react';
import styled from 'styled-components';

import { BasketPreview } from '../checkout/basket/components/basket-preview.component';
import { BodyLink, TextColor, TextWeight, BodyText } from '../../ui/text';
import { Menu } from './menu/menu.component';
import { LogoComponentWithText } from './components/logo-text.component';
import { AccountPreview } from '../account/component/account-preview.component';
import { SearchInput } from '../search/components/search-input.component';
import { useSelector } from 'react-redux';
import { Button, Popover } from '@material-ui/core';
import { StyledIcons } from '../../ui/styled-icon.component';

const HeaderWrapper = styled.div`
    width: 100%;

    position: sticky;
    z-index: 2;
    top: 0;
    border-bottom: 1px solid #ebebeb;

    @media (max-width: 800px) {
      display: none;
    }
`;

const HeaderSection = styled.div`
    display: flex;
    width: 100%;

    box-sizing: border-box;
`;

const FirstHeaderSection = styled(HeaderSection)`
    padding: 0 40px;
    background: #464646;
    height: 70px;
`;

const AccountPreviewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SectionHeader = styled(BodyText).attrs({ color: TextColor.DARK })`
    display: flex;

    color: #fff;
    font-family: 'Manrope';
    font-size: 14px;

    @media (max-width: 1200px) {
        display: none;
    }
`;

const Section = styled.button`
    display: flex;
    cursor: pointer;
    background: none;
    align-items: center;
    justify-content: center;
    border: none;
    padding: 11px 3px 11px 12px;
    box-sizing: border-box;
    border-radius: 4px;
    :hover {
        background: #7aa0a1;
    }
    :active {
        background: #89adad;
    }
`;

export const Header: React.FC = React.memo(function Header() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <HeaderWrapper>
            <FirstHeaderSection>
                {/* <ContactBodyLink href="tel:+375 29 660-39-59">+375 29 660-39-59</ContactBodyLink> */}
                <LogoWrapper>
                    <LogoComponentWithText />
                </LogoWrapper>
                <Menu />

                <AccountPreviewWrapper>
                    <Section onClick={handleClick}>
                        <SectionHeader>Поиск</SectionHeader>
                        <StyledIcons size={27} className="icon-search" />
                    </Section>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        
                    >
                        <SearchInput />
                    </Popover>
                    <BasketPreview />
                    <AccountPreview />
                </AccountPreviewWrapper>
            </FirstHeaderSection>

            {/* <SecondHeaderSection>
                
            </SecondHeaderSection> */}
        </HeaderWrapper>
    );
});
