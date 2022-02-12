import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CompareIcon from '@material-ui/icons/Compare';

import { BodyText, TextColor, TextWeight, TextSize, BodyTextSpan } from '../../../ui/text';
import { useSelector } from 'react-redux';
import { GeneralProduct, OrderProduct } from '../../../graphql/entities';
import { ADD_TO_BASKET } from '../../checkout/basket/actions';
import { useHistory } from 'react-router-dom';
import { getBasketItems } from '../../checkout/basket/selectors';
import { HIDE_FORM_MODAL, SHOW_FORM_MODAL, SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { TOGGLE_COMPARE_LIST } from '../../compare-products/actions';
import { getCompareItemsIds } from '../../compare-products/selectors';
import { getUser } from '../../account/selectors';
import { TOGGLE_WISHLIST } from '../../account/actions';
import { StyledButton } from '../../../ui/new-styled';

const ButtonSection = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
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

export const ProductAddToBasketButton: React.FC<{ product: GeneralProduct; isSmall?: boolean }> = React.memo(
    function ProductAddToBasket({ product, isSmall = false }) {
        const dispatch = useDispatch();
        const basketItems = useSelector(getBasketItems);

        let history = useHistory();

        const isInBasket = useMemo(() => {
            const isHere = basketItems.filter((item) => item.id === product.id);

            return !!isHere.length;
        }, [basketItems, product]);

        const handleAddToBasket = useCallback(() => {
            const generalObject: OrderProduct = {
                id: product.id.toString(),
                code: product.code,
                full_name: product.full_name,
                part_number: product.part_number,
                brand: product.brand,
                type: product.type,
                images: product.images,
                is_in_stock: product.is_in_stock,
                price: product.price,
                discount: product.discount,
                description: product.description,
                category_name: product.category_name,
                count: 1,
            };

            dispatch(ADD_TO_BASKET.TRIGGER(generalObject));
        }, [product, dispatch]);

        const navigateToBasket = useCallback(() => {
            history.push('/basket');
        }, [history]);

        const action = isInBasket ? navigateToBasket : handleAddToBasket;
        const label = isInBasket ? 'Товар уже в корзине' : product.is_in_stock ? 'Добавить в корзину' : 'Нет в наличие';

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
                    isSecondary={isInBasket}
                    additionalStyles={{ flexGrow: 1, marginRight: '20px' }}
                    onClick={action}
                    label={label}
                    disabled={!product.is_in_stock}
                />
            </ButtonSection>
        );
    }
);

export const ProductAddToWishlistButton: React.FC<{ isInWishlist: boolean; productId: string; withLabel?: boolean }> = React.memo(
    function ProductAddToBasket({ isInWishlist, productId, withLabel = false }) {
        const dispatch = useDispatch();
        const currentUser = useSelector(getUser);
        const styles = {
            color: '#606060',
            width: '52px',
            fontSize: '30px',
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
            return isInWishlist ? (
                <FavoriteIcon onClick={addToWishlist} style={styles} />
            ) : (
                <FavoriteBorderIcon onClick={addToWishlist} style={styles} />
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
                            style={{ color: '#6b6b6b', marginRight: '5px', width: '22px', marginLeft: '-25px' }}
                        />
                        {withLabel && <ButtonText>Добавить в избранные</ButtonText>}
                    </>
                )}
            </AdditionalButtonSection>
        );
    }
);

export const ProductAddToCompareButton: React.FC<{ product: GeneralProduct; withLabel?: boolean }> = React.memo(
    function ProductAddToBasket({ product, withLabel = false }) {
        const dispatch = useDispatch();
        const compareListIds = useSelector(getCompareItemsIds);

        const isInCompareList = useMemo(() => {
            const rez = compareListIds.indexOf(parseInt(product.id));

            return rez !== -1;
        }, [compareListIds, product]);

        const addToCompare = useCallback(() => {
            dispatch(TOGGLE_COMPARE_LIST.TRIGGER(parseInt(product.id)));
        }, [product]);

        return (
            <AdditionalButtonSection onClick={addToCompare}>
                {isInCompareList ? (
                    <>
                        <CompareIcon
                            style={{ color: '#6b6b6b', marginRight: '5px', width: '22px', marginLeft: '-25px' }}
                            onClick={addToCompare}
                        />
                        {withLabel && <ButtonText>Удалить из сравнения</ButtonText>}
                    </>
                ) : (
                    <>
                        <CompareIcon
                            style={{ color: '#6b6b6b', marginRight: '5px', width: '22px', marginLeft: '-25px' }}
                            onClick={addToCompare}
                        />
                        {withLabel && <ButtonText>Добавить в сравнение</ButtonText>}
                    </>
                )}
            </AdditionalButtonSection>
        );
    }
);
