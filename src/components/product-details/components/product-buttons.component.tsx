import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CompareIcon from '@material-ui/icons/Compare';

import { BodyText, TextColor, TextWeight, TextSize, BodyTextSpan } from '../../../ui/text';
import { useSelector } from 'react-redux';
import { IProduct, OrderProduct } from '../../../graphql/entities';
import { ADD_TO_BASKET } from '../../checkout/basket/actions';
import { useNavigate } from 'react-router-dom';
import { getBasketItems } from '../../checkout/basket/selectors';
import { HIDE_FORM_MODAL, SHOW_FORM_MODAL, SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { TOGGLE_COMPARE_LIST } from '../../compare-products/actions';
import { getCompareItemsIds } from '../../compare-products/selectors';
import { getUser } from '../../account/selectors';
import { TOGGLE_WISHLIST } from '../../account/actions';
import { StyledButton } from '../../../ui/new-styled';
import { useIsInWishlist } from '../hooks/useIsInWishlist';

const ButtonSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
`;

const Separator = styled.div`
    width: 90%;
    height: 1.2px;
    margin: 20px 0;
    background: #e2e2e2;
`;

const AdditionalButtonSection = styled(ButtonSection)`
    cursor: pointer;
    justify-content: center;
`;

const AddToWishlistButton = styled.div`
  background: black;
  border-radius: 50%;
  padding: 12px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled(BodyText).attrs({ weight: TextWeight.BOLD, size: TextSize.EXTRA_EXTRA_SMALL })`
    color: #616161;
    text-transform: uppercase;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        color: #5da5a7;
    }
`;

export const ProductAddToBasketButton: React.FC<{ product: IProduct; isSmall?: boolean, isSecondary?: boolean }> = React.memo(
    function ProductAddToBasket({ product, isSmall = false, isSecondary = false }) {
        const dispatch = useDispatch();
        const basketItems = useSelector(getBasketItems);

        let history = useNavigate();

        const isInBasket = useMemo(() => {
            const isHere = basketItems.filter((item) => item.id === product.id);

            return !!isHere.length;
        }, [basketItems, product]);

        const handleAddToBasket = useCallback(() => {
            dispatch(ADD_TO_BASKET.TRIGGER({ ...product, count: 1 }));
        }, [product, dispatch]);

        const navigateToBasket = useCallback(() => {
            history('/basket');
        }, [history]);

        const action = isInBasket ? navigateToBasket : handleAddToBasket;
        const label = isInBasket ? 'Товар уже в корзине' : product.isInStock ? 'Добавить в корзину' : 'Нет в наличие';

        if (isSmall) {
            return (
                <ButtonSection>
                    <StyledButton isSecondary={isInBasket} onClick={action} label="В корзине" />
                </ButtonSection>
            );
        }

        return (
            <ButtonSection>
                <StyledButton
                    isSecondary={isInBasket || isSecondary}
                    onClick={action}
                    label={label}
                    disabled={!product.isInStock}
                />
            </ButtonSection>
        );
    }
);

export const ProductAddToWishlistButton: React.FC<{ productId: number; withLabel?: boolean }> =
    React.memo(function ProductAddToBasket({ productId, withLabel = false }) {
        const isInWishlist = useIsInWishlist({ productId: productId });

        const dispatch = useDispatch();
        const currentUser = useSelector(getUser);
        const styles = {
            color: 'white',
            width: '52px',
            fontSize: '24px',
        };

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

        if (!withLabel) {
            return (
              <AddToWishlistButton onClick={addToWishlist}>
                {isInWishlist ? 
                  <FavoriteIcon style={styles} />
                : <FavoriteBorderIcon style={styles} />}
              </AddToWishlistButton>
            );
        }

        return (
            <AdditionalButtonSection onClick={addToWishlist}>
                {isInWishlist ? (
                    <>
                        <FavoriteIcon
                            style={{ color: '#6b6b6b', marginRight: '5px', width: '22px', marginLeft: '-25px' }}
                        />
                        {withLabel && <ButtonText>Удалить из избранных</ButtonText>}
                    </>
                ) : (
                    <>
                        <FavoriteBorderIcon
                            style={{ color: '#6b6b6b', marginRight: '5px', width: '14px', marginLeft: '-25px' }}
                        />
                        {withLabel && <ButtonText>Добавить в избранные</ButtonText>}
                    </>
                )}
            </AdditionalButtonSection>
        );
    });
