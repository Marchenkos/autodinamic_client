import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import { BodyText, TextColor, TextSize, TextWeight, TitleText } from '../../../ui/text';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Promotion } from '../../../graphql/entities';
import { parseDate } from '../helper/parse-date';
import { getPromotionsList, getIsPromotionsListFetching } from '../selectors';

const Wrapper = styled.div`
    width: 100%;
`;

const PromotionsWrapper = styled.div`
    width: 85%;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const NewsItemWrapper = styled.div`
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

const NewsItemTitle = styled(BodyText).attrs({ size: TextSize.LARGE, color: TextColor.DARK })`
    @media (max-width: 850px) {
        font-size: 16px;
    }
`;

const NewsImage = styled.img`
    max-width: 100%;
    height: auto;
    resize-mode: contain;
    align-items: center;
    margin-top: 20px;
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageTitleText = styled(TitleText)`
    font-size: 40px;
    text-transform: uppercase;
    width: 85%;
    margin: 30px auto 50px;

    @media (max-width: 850px) {
        font-size: 20px;
        width: 100%;
    }
`;

const DateText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })`
    @media (max-width: 850px) {
        font-size: 12px;
    }
`;

const PromotionsListScreen: React.FC = React.memo(function PromotionsListScreen() {
    const history = useNavigate();
    const promotionsList = useSelector(getPromotionsList);
    const isFetching = useSelector(getIsPromotionsListFetching);

    const navigateToNewsDetails = React.useCallback(
        (promotion: Promotion) => {
            history(`/promotion/${promotion.id}`);
        },
        [history]
    );

    if (isFetching) {
        return (
            <LoadingWrapper>
                <CircularProgress style={{ color: '#51acae' }} />
            </LoadingWrapper>
        );
    }

    if (!promotionsList) {
        return (
            <Wrapper>
                <PageTitleText>Акции</PageTitleText>
                <PageTitleText>На данный момент никакие акции не проводятся</PageTitleText>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <PageTitleText>Акции</PageTitleText>
            <PromotionsWrapper>
                {promotionsList.map((promotion: Promotion) => (
                    <NewsItemWrapper onClick={() => navigateToNewsDetails(promotion)} key={promotion.id}>
                        <NewsItemTitle>{promotion.title}</NewsItemTitle>
                        <DateText>{`Время проведения акции: с ${parseDate(promotion.start_date)} ${
                            promotion.end_date ? `по ${parseDate(promotion.end_date)}` : ''
                        }`}</DateText>
                        <NewsImage src={promotion.image} />
                    </NewsItemWrapper>
                ))}
            </PromotionsWrapper>
        </Wrapper>
    );
});

export default PromotionsListScreen;
