import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { BodyText, TextColor, TextSize, TextWeight, TitleText } from '../../../ui/text';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Promotion } from '../../../graphql/entities';
import { parseDate } from '../helper/parse-date';
import { GoBackLink } from '../../general/components/go-back-link.component';
import { LoadingState } from '../../../ui/loading-state';
import { FETCH_PROMOTION_BY_ID } from '../actions';
import { getPromotionDetails, getIsPromotionDetailsFetching } from '../selectors';

const NewsWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 40px 50px 80px;
    background: white;

    @media (max-width: 850px) {
        width: 90%;
        padding: 20px;
    }
`;

const NewsImage = styled.img`
    max-width: 100%;
    height: auto;
    resize-mode: contain;
    align-items: center;
    margin-bottom: 20px;
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PageTitleText = styled(TitleText)`
    font-size: 30px;
    margin-bottom: 20px;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

const DateText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })`
    margin-bottom: 20px;
`;

const GoBackText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })`
    margin: 20px 0;

    &:hover {
        color: #48b3b3;
    }
`;

const PromotionDetailsScreen: React.FC = React.memo(function PromotionDetailsScreen() {
    const { id } = useParams<{ id: string }>();
    const promotion = useSelector(getPromotionDetails);
    const isFetching = useSelector(getIsPromotionDetailsFetching);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FETCH_PROMOTION_BY_ID.TRIGGER(parseInt(id)));
    }, [dispatch, id]);

    if (isFetching) {
        return <LoadingState />;
    }

    if (!promotion) {
        return null;
    }

    return (
        <NewsWrapper>
            <GoBackLink title="Назад к новостям" />
            <PageTitleText>{promotion.title}</PageTitleText>
            <DateText>{`Время проведения акции: с ${parseDate(promotion.start_date)} ${
                promotion.end_date ? `по ${parseDate(promotion.end_date)}` : ''
            }`}</DateText>
            <DateText>{promotion.description}</DateText>
            <NewsImage src={promotion.image} />
        </NewsWrapper>
    );
});

export default PromotionDetailsScreen;
