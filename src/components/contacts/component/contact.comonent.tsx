import { Button } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { Map, InfoWindow, Marker } from 'google-maps-react';

import styled from 'styled-components';
import { BodyText, TextColor, TextSize, TitleText, TextWeight, BodyLink } from '../../../ui/text';

const ContactInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 0 auto;
`;

const ContactSection = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

const LabelText = styled(BodyText).attrs({ color: TextColor.MEDIUM, size: TextSize.EXTRA_SMALL })`
    margin-bottom: 10px;
    width: 90%;
`;

const ContactBodyLink = styled(BodyLink).attrs({ size: TextSize.SMALL, weight: TextWeight.BOLD })`
    padding: 1px 0;
    margin-bottom: 5px;
`;

const ValueText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.EXTRA_SMALL })`
    margin-bottom: 10px;
`;

const PageTitleText = styled(TitleText)`
    font-size: 25px;
    margin-bottom: 20px;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

export const ContactComponent: React.FC = React.memo(function ContactComponent() {
    return (
        <ContactInfoWrapper>
            <PageTitleText>Контактная информация для покупателей</PageTitleText>
            <ContactSection>
                <LabelText>
                    Для консультации о товарах, уточнения информации о заказе или получения любой другой интересующей
                    Вас информации, воспользуйтесь нашими контактами, либо отправьте сообщение и мы свяжемся с Вами!
                    Адрес нашего магазина: ул. Карповича 28, Гомель.
                </LabelText>
                <ContactBodyLink href="tel:+375 29 660-39-59">+375 (29) 660-39-59</ContactBodyLink>
                <ContactBodyLink href="mailto:mar-cer@yandex.ru?subject=Вопрос от покупателя">
                    mar-cer@yandex.ru
                </ContactBodyLink>
            </ContactSection>
        </ContactInfoWrapper>
    );
});
