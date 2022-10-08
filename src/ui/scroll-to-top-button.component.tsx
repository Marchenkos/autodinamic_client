import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import ScrollUpIcon from '../../public/assets/scrollUp.png';
import { BodyText } from './text';

const Wrapper = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    cursor: pointer;

    background: #ffffff33;
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;

    @media (max-width: 800px) {
        width: 70px;
        height: 70px;
        right: 0px;
        bottom: 70px;
    }
`;

const ScrollUpImg = styled.img`
    max-width: 50px;

    @media (max-width: 800px) {
        max-width: 25px;
    }
`;

const ScrollUpText = styled(BodyText)`
    font-size: 15px;

    @media (max-width: 800px) {
        font-size: 11px;
    }
    color: #61bec0;
`;

export const ScrollToTopButton: React.FC = React.memo(function ScrollToTopButton() {
    const [isVisible, setVisible] = useState(false);

    const toggleVisible = () => {
        if (window.pageYOffset > 700) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisible);

        return () => {
            window.removeEventListener('scroll', toggleVisible);
        };
    }, [toggleVisible]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <Wrapper onClick={scrollToTop}>
            <ScrollUpImg src={ScrollUpIcon} />
            <ScrollUpText>наверх</ScrollUpText>
        </Wrapper>
    );
});
