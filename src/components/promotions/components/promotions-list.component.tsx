import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { LoadingWrapper, PageTitleText, Wrapper, DateText, PromotionsWrapper, NewsImage, NewsItemTitle, NewsItemWrapper } from './promotions-list.styled';
import { Promotion } from '../../../graphql/entities';
import { parseDate } from '../helper/parse-date';
import { getPromotionsList, getIsPromotionsListFetching } from '../selectors';

export const PromotionsList: React.FC = React.memo(function PromotionsList() {
    const navigate = useNavigate();
    const promotionsList = useSelector(getPromotionsList);
    const isFetching = useSelector(getIsPromotionsListFetching);

    const navigateToNewsDetails = React.useCallback((promotion: Promotion) => {
      navigate(`/promotions/${promotion.id}`);
    },[history]);

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
