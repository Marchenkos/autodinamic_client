import styled from 'styled-components';

import { BodyText, TextSize, TextColor, TitleText } from '../../../ui/text';

export const Wrapper = styled.div`
    width: 100%;
`;

export const PromotionsWrapper = styled.div`
    width: 85%;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

export const NewsItemWrapper = styled.div`
    max-width: 45%;
    cursor: pointer;
    margin-bottom: 15px;

    @media (max-width: 850px) {
        max-width: 100%;
        margin-bottom: 20px;
        background: #f0f3f3;
        padding: 20px;
        border-radius: 2px;
    }
`;

export const NewsItemTitle = styled(BodyText).attrs({ size: TextSize.LARGE, color: TextColor.DARK })`
    @media (max-width: 850px) {
        font-size: 16px;
    }
`;

export const NewsImage = styled.img`
    max-width: 100%;
    height: auto;
    resize-mode: contain;
    align-items: center;
    margin-top: 20px;
`;

export const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PageTitleText = styled(TitleText)`
    font-size: 40px;
    text-transform: uppercase;
    width: 85%;
    margin: 30px auto 50px;

    @media (max-width: 850px) {
        font-size: 20px;
        width: 100%;
    }
`;

export const DateText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })`
    @media (max-width: 850px) {
        font-size: 12px;
    }
`;
