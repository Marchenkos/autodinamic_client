import styled from 'styled-components';

import { TitleText, BodyText, TextSize, TextColor } from '../../../ui/text';

export const SinglePromotionWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 40px 50px 80px;
    background: white;

    @media (max-width: 850px) {
        width: 90%;
        padding: 20px;
    }
`;

export const SinglePromotionImage = styled.img`
    max-width: 100%;
    height: auto;
    resize-mode: contain;
    align-items: center;
    margin-bottom: 20px;
`;

export const SinglePromotionTitle = styled(TitleText)`
    font-size: 30px;
    margin-bottom: 20px;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

export const SinglePromotionDateText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })`
    margin-bottom: 20px;
`;
