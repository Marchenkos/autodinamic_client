import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useIsInWishlist } from '../../components/product-details/hooks/useIsInWishlist';
import { TOGGLE_WISHLIST } from '../../components/account/actions';
import { getUser } from '../../components/account/selectors';
import { SHOW_SIMPLE_MODAL } from '../../components/modal/actions';

const Wrapper = styled.div`
  padding: 12px;
`;

export const UIAddToCompareList: React.FC<{ productId: number }> = React.memo(function UIAddToCompareList({ productId }) {
 
    const addToComparelist = useCallback(() => {
        
    }, [productId]);

    return (
      <Wrapper onClick={addToComparelist}>
        <i className="fa-solid fa-code-compare"></i>

        
      </Wrapper>
    );
});
