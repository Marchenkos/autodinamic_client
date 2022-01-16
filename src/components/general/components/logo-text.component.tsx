import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { TitleText, TextColor, BodyText, TextSize } from '../../../ui/text';

const LogoTextSection = styled.div<{ isFooter?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 250px;

    @media (max-width: 1400px) {
        display: ${(props) => (!props.isFooter ? 'none' : 'flex')};
    }

    @media (max-width: 850px) {
        display: flex;
        padding-left: 5px;
        width: 50%;
    }

    @media (max-width: 420px) {
        width: 100%;
        padding-left: 0;
    }
`;

const LogoText = styled(TitleText).attrs({ color: TextColor.BLUE })`
    margin-bottom: -5px;

    @media (max-width: 850px) {
        font-size: 20px;
    }

    @media (max-width: 420px) {
        font-size: 16px;
    }
`;

const LogoDescriptionText = styled(BodyText).attrs({ size: TextSize.EXTRA_EXTRA_SMALL })`
    color: #bfbfbf;

    @media (max-width: 850px) {
        display: none;
    }
`;

const LogoWrapper = styled.div`
    display: flex;
    cursor: pointer;
`;

export const LogoComponentWithText: React.FC<{ isFooter?: boolean }> = React.memo(function LogoComponentWithText({
    isFooter,
}) {
    const history = useHistory();

    const navigateHome = () => {
        history.push('/');
    };

    return (
        <LogoWrapper onClick={navigateHome}>
            <LogoTextSection isFooter={isFooter}>
                <LogoText>АutoDinamik</LogoText>
                <LogoDescriptionText>мы знаем, что нужно твоей машине</LogoDescriptionText>
            </LogoTextSection>
        </LogoWrapper>
    );
});
