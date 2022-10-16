import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { FETCH_PRODUCT_BY_ID } from '../components/product-details/actions';
import { ProductDetails } from '../components/product-details/components/product-details.component';

const Wrapper = styled.div`
    margin: 0 auto;
    padding: 20px 0;
`;

const SingleProductPage: React.FC = React.memo(function SingleProductPage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
      if (id) {
        dispatch(FETCH_PRODUCT_BY_ID.TRIGGER(parseInt(id)));
      }
    }, [dispatch, id]);

    return (
      <Wrapper>
        <ProductDetails />
      </Wrapper>
    );
});

export default SingleProductPage;
