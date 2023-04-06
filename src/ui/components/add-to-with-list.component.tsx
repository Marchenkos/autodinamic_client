import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useIsInWishlist } from '../../components/product-details/hooks/useIsInWishlist';
import { TOGGLE_WISHLIST } from '../../components/account/actions';
import { getUser } from '../../components/account/selectors';
import { SHOW_SIMPLE_MODAL } from '../../components/modal/actions';

const AddToWishlistButton = styled.div`
  padding: 12px;
`;

export const UIAddToWishList: React.FC<{ productId: number }> = React.memo(function ProductAddToBasket({ productId }) {
    const isInWishlist = useIsInWishlist({ productId: productId });

    const dispatch = useDispatch();
    const currentUser = useSelector(getUser);

    const addToWishlist = useCallback(() => {
        if (!currentUser) {
            dispatch(
                SHOW_SIMPLE_MODAL({
                    text: 'Пожалуйста войдите в свой аккаунт или зарегистрируйтесь, чтобы добавить товар в избранные',
                })
            );
        } else {
            dispatch(TOGGLE_WISHLIST.TRIGGER(productId));
        }
    }, [productId]);

    return (
      <AddToWishlistButton onClick={addToWishlist}>
        {isInWishlist ? 
        <i className="fa-solid fa-heart"></i>
        : <i className="fa-regular fa-heart"></i>}
      </AddToWishlistButton>
    );
});
