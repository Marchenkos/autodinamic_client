import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { LoadingState } from '../../../ui/loading-state';
import { GoBackLink } from '../../general/components/go-back-link.component';
import { FETCH_PROMOTION_BY_ID } from '../actions';
import { parseDate } from '../helper/parse-date';
import { getPromotionDetails, getIsPromotionDetailsFetching } from '../selectors';
import { SinglePromotionWrapper, SinglePromotionTitle, SinglePromotionDateText, SinglePromotionImage } from './single-promotion.styled';

const SinglePromotion: React.FC = React.memo(function SinglePromotion() {
    const { id } = useParams<{ id: string }>();
    const promotion = useSelector(getPromotionDetails);
    const isFetching = useSelector(getIsPromotionDetailsFetching);
    const dispatch = useDispatch();

    useEffect(() => {
      if (id) {
        dispatch(FETCH_PROMOTION_BY_ID.TRIGGER(parseInt(id)));
      }
    }, [dispatch, id]);

    if (isFetching) {
        return <LoadingState />;
    }

    if (!promotion) {
        return null;
    }

  return (
    <SinglePromotionWrapper>
      <GoBackLink title="Назад к новостям" />
      <SinglePromotionTitle>{promotion.title}</SinglePromotionTitle>
      <SinglePromotionDateText>{`Время проведения акции: с ${parseDate(promotion.start_date)} ${
          promotion.end_date ? `по ${parseDate(promotion.end_date)}` : ''
      }`}</SinglePromotionDateText>
      <SinglePromotionDateText>{promotion.description}</SinglePromotionDateText>
      <SinglePromotionImage src={promotion.image} />
    </SinglePromotionWrapper>
  );
});

export default SinglePromotion;
