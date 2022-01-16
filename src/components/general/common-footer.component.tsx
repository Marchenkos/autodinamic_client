import React, { useMemo } from 'react';
import styled from 'styled-components';

import { StyledLink } from '../../ui/styled-link.component';
import { BodyText, TextSize, TextColor, TextWeight, BodyTextSpan } from '../../ui/text';
import { capitalizeString } from '../filter/utilites/formated-string';
import { LogoComponentWithText } from './components/logo-text.component';

const FooterWrapper = styled.div`
    width: 100%;
    padding: 50px 0 15px;
    display: flex;
    flex-direction: column;
    background: #080808;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    height: 180px;
`;

const FooterMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 35px 0 50px;

    @media (max-width: 810px) {
        flex-direction: column;
    }
`;

const FooterCopyrightWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 980px) {
        flex-direction: column;
    }
`;

export const MenuText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.LIGHT })`
    padding: 1px 0;

    &:focus, &:hover, &:visited, &:link, &:active {
        color: #5da5a7;
    }
}`;

const CopyriterText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.LIGHT })`
    padding: 1px 0;
    margin-right: 5px;
}`;

const CopyriterTextDescription = styled(BodyTextSpan).attrs({
    size: TextSize.EXTRA_SMALL,
    color: TextColor.BLUE,
    weight: TextWeight.DEFAULT,
})`
    display: block;

    @media (max-width: 640px) {
        display: none;
    }
}`;

export const MenuItemLink = styled(StyledLink)`
    margin-right: 20px;
    margin-bottom: 0px;

    @media (max-width: 810px) {
        margin-right: 0px;
        margin-bottom: 10px;
    }
`;

const menuConfig = [
    {
        name: 'каталог',
        url: '/catalog/all',
    },
    {
        name: 'сравнение товаров',
        url: '/delivery',
    },
    {
        name: 'проверить заказ',
        url: '/check-order',
    },
    {
        name: 'доставка',
        url: '/delivery',
    },
    {
        name: 'контакты',
        url: '/contacts',
    },
];

export const CommonFooter: React.FC = React.memo(function CommonFooter() {
    const menuContent = useMemo(
        () =>
            menuConfig.map((item, index: number) => (
                <MenuItemLink key={index} to={item.url}>
                    <MenuText>{capitalizeString(item.name)}</MenuText>
                </MenuItemLink>
            )),
        [menuConfig]
    );

    return (
        <FooterWrapper>
            <StyledLink to="/home" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LogoComponentWithText isFooter={true} />
            </StyledLink>
            <FooterMenu>{menuContent}</FooterMenu>
            <FooterCopyrightWrapper>
                <CopyriterText>© Марсенко Ксения, 2021. Все права защищены.</CopyriterText>
                <CopyriterTextDescription>
                    Автодинамик — интернет-магазин современной аудиотехники для автомобилей
                </CopyriterTextDescription>
            </FooterCopyrightWrapper>
        </FooterWrapper>
    );
});
