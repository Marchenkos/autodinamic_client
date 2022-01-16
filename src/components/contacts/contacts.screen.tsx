import React from 'react';

import { ContactComponent } from './component/contact.comonent';
import styled from 'styled-components';
import { CallbackForm } from './component/callback-form.component';
import { TitleText, TextColor, TextSize, TextWeight } from '../../ui/text';

export const API_KEY = 'AIzaSyBbVtUQaQ7u7ytsbB6OQ_0IRqOscjICMKQ';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
`;

const ContentWrapper = styled.div`
    padding: 40px 200px 80px;

    @media (max-width: 850px) {
        padding: 20px 20px 30px;
    }
`;

const PageTitleText = styled(TitleText)`
    font-size: 20px;
    margin: 40px 0 20px;

    @media (max-width: 850px) {
        margin: 20px 0 20px;
    }
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
            <ContentWrapper>
                <ContactComponent />
                <PageTitleText>Форма для связи с продавцом</PageTitleText>
                <CallbackForm />
            </ContentWrapper>
        </Wrapper>
    );
});

export default ContactScreen;
