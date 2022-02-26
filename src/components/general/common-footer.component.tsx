import React, { useMemo } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';

import { StyledLink } from '../../ui/styled-link.component';
import { BodyText, TextSize, TextColor, TextWeight, BodyTextSpan } from '../../ui/text';
import { capitalizeString } from '../filter/utilites/formated-string';
import { LogoComponentWithText } from './components/logo-text.component';

const FooterWrapper = styled.div`
    width: 100%;
	padding: 30px 50px;
	align-items: flex-start;
    display: flex;
    flex-direction: column;
    background: #222222;
    position: absolute;
    bottom: 0;

	box-sizing: border-box;

	@media (max-width: 500px) {
		padding: 30px;
    }

	@media (max-width: 800px) {
		padding: 30px 20px 80px;
    }
`;

const FooterContent = styled.div`
    width: 100%;
	align-items: flex-start;
    display: flex;

	margin: 40px 0 30px;
    padding-left: 5px;
	flex-wrap: wrap;
	box-sizing: border-box;
`;

const CustomerInfoWrapper = styled.div`
    box-sizing: border-box;
	display: flex;
    align-items: center;
	flex-direction: column;

	flex-grow: 1;
	align-items: end;

	@media (max-width: 800px) {
		justify-content: flex-start;
		align-items: flex-start;
		margin-top: 50px;
    }
`;

const FooterMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
	align-items: self-start;
    margin-right: 50px;
	flex-direction: column;
`;

const FooterCopyrightWrapper = styled.div`
    display: flex;
    align-items: center;

	width: 100%;
    justify-content: space-between;

    @media (max-width: 800px) {
        flex-direction: column;
		justify-content: center;
    }
`;

const MenuText = styled(BodyText).attrs({ color: TextColor.LIGHT })`
	margin-bottom: 5px;
	font-size: 14px;	

	@media (max-width: 800px) {
		font-size: 13px;
    }

    &:focus, &:hover, &:visited, &:link, &:active {
        color: #5da5a7;
    }
}`;

const CopyriterText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.LIGHT })`
    padding: 1px 0;
	box-sizing: border-box;
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

const MenuItemLink = styled(StyledLink)`
    margin-right: 20px;
    margin-bottom: 0px;

    @media (max-width: 810px) {
        margin-right: 0px;
        margin-bottom: 10px;
    }
`;

const menuConfig = [
	[
		{
			name: 'о нас',
			url: '/catalog/all',
		},
		{
			name: 'проверка заказа',
			url: '/catalog/all',
		},
		{
			name: 'условия доставки',
			url: '/delivery',
		},
		{
			name: 'оплата и возврат',
			url: '/check-order',
		},
	],
	[
		{
			name: 'служба поддержки',
			url: '/',
		},
		{
			name: 'условия соглашения',
			url: '/',
		},
		{
			name: 'политика безопасности',
			url: '/',
		},
	]
];

export const CommonFooter: React.FC = React.memo(function CommonFooter() {
    const menuContent = useCallback(
        (index: number) =>
            menuConfig[index].map((item, index: number) => (
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
			<FooterContent>
				<FooterMenu>{menuContent(0)}</FooterMenu>
				<FooterMenu>{menuContent(1)}</FooterMenu>
				<CustomerInfoWrapper>
					<MenuText>
						ИП Марченко С.И. УНП #######
					</MenuText>
					<MenuText>
						Зарегистрирован в торговом реестре от ##.##.#### за номером ###.
					</MenuText>
				</CustomerInfoWrapper>
			</FooterContent>

            <FooterCopyrightWrapper>
                <CopyriterText>© Марсенко Ксения, 2021. Все права защищены.</CopyriterText>
                <CopyriterTextDescription>
                    Автодинамик — интернет-магазин современной аудиотехники для автомобилей
                </CopyriterTextDescription>
            </FooterCopyrightWrapper>
        </FooterWrapper>
    );
});
