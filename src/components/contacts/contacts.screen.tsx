import React from 'react';

import MessageImage from '../../../public/assets/contacts/message.png';
import styled from 'styled-components';
import { CallbackForm } from './component/callback-form.component';
import { TitleText, TextColor, TextSize, TextWeight, BodyText } from '../../ui/text';

export const API_KEY = 'AIzaSyBbVtUQaQ7u7ytsbB6OQ_0IRqOscjICMKQ';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const Section = styled.div<{ noPadding?: boolean }>`
    ${props => !props.noPadding && `
        padding: 40px 200px 0px;

        @media (max-width: 850px) {
            padding: 20px 20px 0px;
        }
    `}
`;

const ContactInfoWtapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 50px;
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
    line-height: 25px;
`;

const PageTitleText = styled(TitleText)`
    font-size: 20px;
    margin: 40px 0 20px;

    @media (max-width: 850px) {
        margin: 20px 0 20px;
    }
`;

const ContactText = styled(BodyText)`
    font-size: 14px;
    text-align: center;
`;

const ContactScreen: React.FC = React.memo(function ContactScreen() {
    return (
        <Wrapper>
            {/* <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.973504149803!2d30.99558911604926!3d52.425277779796346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d469b28ef0c581%3A0x7658a3adaf497ffe!2z0KbQtdC90YLRgNCw0LvRjNC90YvQuSDQoNGL0L3QvtC6!5e0!3m2!1sru!2sby!4v1620577565549!5m2!1sru!2sby"
            width="100%"
            height="100%"
            style={{ border: '0'}}
            loading="lazy"
        ></iframe> */}
            <Section>
                <PageTitleText>О нас</PageTitleText>
                <DescriptionText>
                    <b>АвтоДинамик</b> - интернет-магазин техники для автомобилей. Мы предлагаем большое разнообразие товаров, которые помогут 
                    сделать Ваш автомобиль комфортнее и современнее. В нашем интернет-магазине Вы можете найти качественную аудиотехнику, выбрать товар по определенным характеристикам, а также защитить себя и Ваш автомобиль с помощью видеорегистраторов и современной сигнализации.

                </DescriptionText>
            </Section>

            <Section>
                <PageTitleText>Контактная информация</PageTitleText>
                <DescriptionText>
                    При возникновении вопросов, касающихся оформления или доставки заказа, а также для получения дополнительной консультации при выборе товара, Вы можете обратиться к продавцу, воспользовавшись нашими контактами, либо заполните форму <b>Обратной связи</b> и мы сами свяжемся с Вами. Будем рады помочь!
                </DescriptionText>

                <ContactInfoWtapper>
                    <ContactInfoSection>
                        <ContactImage src={MessageImage} />
                        <ContactTextWrapper>
                            <ContactText>
                                <b>Позвоните нам</b>
                            </ContactText>
                            <ContactText>
                                +375(29)-660-39-59  - продавец
                            </ContactText>
                            <ContactText>
                                +375(29)-161-97-61  - для вопросов по сайту
                            </ContactText>
                        </ContactTextWrapper>
                    </ContactInfoSection>

                    <ContactInfoSection>
                        <ContactImage src={MessageImage} />
                        <ContactTextWrapper>
                            <ContactText>
                                <b>Напишите нам</b>
                            </ContactText>
                            <ContactText>
                                mar-cer@yandex.ru  - продавец
                            </ContactText>
                            <ContactText>
                                auto-dinamic-sup@mail.ru  - техподдержка
                            </ContactText>
                        </ContactTextWrapper>
                    </ContactInfoSection>

                    <ContactInfoSection>
                        <ContactImage src={MessageImage} />
                        <ContactTextWrapper>
                            <ContactText>
                                <b>Приезжайте</b>
                            </ContactText>
                            <ContactText>
                            Мы находимся по адресу
                            </ContactText>
                            <ContactText>
                                г.Гомель, ул. Карповича 28.
                            </ContactText>
                        </ContactTextWrapper>
                    </ContactInfoSection>

                </ContactInfoWtapper>
            </Section>

            <Section noPadding>
                <CallbackForm />
            </Section>
        </Wrapper>
    );
});

export default ContactScreen;
