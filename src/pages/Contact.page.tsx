import React, { useEffect, useMemo, useState } from 'react';

import MessageImage from '../../public/assets/contacts/message.png';
import styled from 'styled-components';
import { CallbackForm } from '../components/contacts/component/callback-form.component';
import { TitleText, TextColor, TextSize, TextWeight, BodyText, TitleLink } from '../ui/text';
import { IHeaderLink } from '../components/product-details/components/similar-products.component';
import { useLocation } from 'react-router-dom';

export const API_KEY = 'AIzaSyBbVtUQaQ7u7ytsbB6OQ_0IRqOscjICMKQ';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const PageTitleText = styled(TitleText)`
    font-size: 25px;
    background: #858585;
    margin-bottom: 20px;
    color: white;
    padding: 15px;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

const Section = styled.div`
    margin-bottom: 50px;
`;

const CallBackFormWrapper = styled.div`
    background: #f1f1f1;
    border-top: 15px solid #498f91;
    padding: 60px 0;
`;

const ContactInfoWtapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 50px;
    flex-direction: row;

    @media (max-width: 850px) {
        flex-direction: column;
    }
`;

const ContactInfoSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContactTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContactImage = styled.img`
    max-width: 50%;
`;

const DescriptionText = styled(BodyText)`
    font-size: 15px;
    line-height: 27px;
`;

const PageSubTitleText = styled(TitleText)`
    font-size: 20px;
    margin-bottom: 30px;
`;

const ContactText = styled(BodyText)`
    font-size: 14px;
    text-align: center;
`;

const PadeDetailWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    padding: 50px;

    @media (max-width: 980px) {
        flex-direction: column;
        padding: 20px;
        margin-top: 0px;
    }
`;

const TabBarBlock = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;

    @media (max-width: 980px) {
        flex-direction: row;
        width: 100%;
        padding-left: 0px;
        margin-bottom: 20px;
        justify-content: space-between;
    }
`;

const MainInfo = styled.div`
    display: flex;
    width: 75%;
    flex-direction: column;

    @media (max-width: 980px) {
        width: 90%;
    }
`;

const UnitLink = styled(TitleLink).attrs({
    color: TextColor.MEDIUM,
})<{ selected?: boolean }>`
    ${({ selected }) => (selected ? 'border-bottom: 2px solid #1e1e1e' : '')};
    margin-right: 10px;
    padding: 10px;
    text-decoration: underline;
    font-weight: 500;
    font-family: 'Manrope';
    font-size: 15px;
    margin-right: 60px;
    margin-bottom: 20px;

    &:hover {
        color: #808080;
        border-bottom: 2px solid #1e1e1e;
    }

    @media (max-width: 850px) {
        font-size: 11px;
        max-width: 32%;
        padding: 0px;
        margin: 0px;
    }
`;

const ContactPage: React.FC = React.memo(function ContactPage() {
    let location = useLocation();
    const [selectedUnit, setSelectedUnit] = useState(0);

    const units: IHeaderLink[] = [
        {
            id: 1,
            header: '- О нас',
            link: '#about',
        },
        {
            id: 2,
            header: '- Контактная информация',
            link: '#contact-info',
        },
        {
            id: 3,
            header: '- Форма обратной связи',
            link: '#callback-form',
        },
    ];

    useEffect(() => {
        units.map((item) => {
            if (location.pathname.includes(item.link)) {
                setSelectedUnit(item.id);
            }
        });
    }, [location.pathname, units]);

    const renderUnitHeaders = useMemo(
        () =>
            units.map((item, index) => (
                <UnitLink
                    key={index}
                    onClick={() => setSelectedUnit(item.id)}
                    href={item.link}
                    selected={item.id === selectedUnit}
                >
                    {item.header}
                </UnitLink>
            )),
        [units, selectedUnit]
    );

    return (
        <Wrapper>
            <PageTitleText>Наш магазин</PageTitleText>
            <PadeDetailWrapper>
                <TabBarBlock>{renderUnitHeaders}</TabBarBlock>

                <MainInfo>
                    <Section id="about">
                        <PageSubTitleText>О нас</PageSubTitleText>
                        <DescriptionText>
                            <b>АвтоДинамик</b> - интернет-магазин техники для автомобилей. Мы предлагаем большое
                            разнообразие товаров, которые помогут сделать Ваш автомобиль комфортнее и современнее. В
                            нашем интернет-магазине Вы можете найти качественную аудиотехнику, выбрать товар по
                            определенным характеристикам, а также защитить себя и Ваш автомобиль с помощью
                            видеорегистраторов и современной сигнализации.
                        </DescriptionText>
                    </Section>

                    <Section id="contact-info">
                        <PageSubTitleText>Контактная информация</PageSubTitleText>
                        <DescriptionText>
                            При возникновении вопросов, касающихся оформления или доставки заказа, а также для получения
                            дополнительной консультации при выборе товара, Вы можете обратиться к продавцу,
                            воспользовавшись нашими контактами, либо заполните форму <b>Обратной связи</b> и мы сами
                            свяжемся с Вами. Будем рады помочь!
                        </DescriptionText>

                        <ContactInfoWtapper>
                            <ContactInfoSection>
                                <ContactImage src={MessageImage} />
                                <ContactTextWrapper>
                                    <ContactText>
                                        <b>Позвоните нам</b>
                                    </ContactText>
                                    <ContactText>+375(29)-660-39-59 - продавец</ContactText>
                                    <ContactText>+375(29)-161-97-61 - для вопросов по сайту</ContactText>
                                </ContactTextWrapper>
                            </ContactInfoSection>

                            <ContactInfoSection>
                                <ContactImage src={MessageImage} />
                                <ContactTextWrapper>
                                    <ContactText>
                                        <b>Напишите нам</b>
                                    </ContactText>
                                    <ContactText>mar-cer@yandex.ru - продавец</ContactText>
                                    <ContactText>auto-dinamic-sup@mail.ru - техподдержка</ContactText>
                                </ContactTextWrapper>
                            </ContactInfoSection>

                            <ContactInfoSection>
                                <ContactImage src={MessageImage} />
                                <ContactTextWrapper>
                                    <ContactText>
                                        <b>Приезжайте</b>
                                    </ContactText>
                                    <ContactText>Мы находимся по адресу</ContactText>
                                    <ContactText>г.Гомель, ул. Карповича 28.</ContactText>
                                </ContactTextWrapper>
                            </ContactInfoSection>
                        </ContactInfoWtapper>
                    </Section>
                </MainInfo>
            </PadeDetailWrapper>

            <CallBackFormWrapper id="callback-form">
                <CallbackForm />
            </CallBackFormWrapper>
        </Wrapper>
    );
});

export default ContactPage;
