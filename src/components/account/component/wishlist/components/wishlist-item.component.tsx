import React, { useCallback } from 'react';
import styled from 'styled-components';

import { BodyText, BoldSmallText, TextColor, TextSize, TextWeight, TitleText } from '../../../../../ui/text';
import { useHistory } from 'react-router-dom';
import { GeneralProduct, OrderProduct } from '../../../../../graphql/entities';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { ADD_TO_BASKET } from '../../../../checkout/basket/actions';
import { TOGGLE_WISHLIST } from '../../../actions';
import { NULLABLE_IMAGE } from '../../../../product-details/components/product-detail-image.component';
import { StyledButton } from '../../../../../ui/new-styled';
import { StyledIcons } from '../../../../../ui/styled-icon.component';
import { ProductPrice } from '../../../../product-details/components/product-price.component';

const Wrapper = styled.div`
    display: flex;
    width: 70%;
    margin: 50px 0;
`;

const DescriptionBlock = styled.div`
    flex-grow: 1;
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const ProductImage = styled.img`
    max-width: 15%;
    height: auto;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 300px;
    align-items: end;
    margin-left: 50px;
`;

const ProductTitle = styled(TitleText)`
    font-size: 16px;
    margin-bottom: 20px;
`;

const DescriptionText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL })`
    margin-top: 15px;
`;

const CloseButton = styled(StyledIcons)`
    flex-grow: 1;
    margin: 0;
`;

const PriceSection = styled.div`
    margin: 15px 0;
`;

const ProductCodeText = styled(BodyText)`
    margin-top: 0px;
    text-transform: lowercase;
    font-size: 14px;
    color: #b9b8b8;
`;

interface WishlistItemProps {
    product: GeneralProduct;
}

export const WishlistItem: React.FC<WishlistItemProps> = React.memo(function WishlistItem({
    product,
}: WishlistItemProps) {
    let history = useHistory();
    let dispatch = useDispatch();

    const handleAddToBasket = useCallback(() => {
        if (product) {
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
        }
    }, [product, dispatch]);

    const handleRemove = useCallback(() => {
        dispatch(TOGGLE_WISHLIST.TRIGGER(product.id));
    }, [product]);

    const navigateToTheProductDetails = useCallback(() => {}, [history]);

    return (
        <Wrapper>
            <ProductImage src={product.images ? product.images[0].displayUrl : NULLABLE_IMAGE} />

            <DescriptionBlock>
                <ProductTitle onClick={navigateToTheProductDetails}>{product.full_name}</ProductTitle>
                <ProductCodeText>
                    код товара: <BoldSmallText>{product.code}</BoldSmallText>
                </ProductCodeText>
                <DescriptionText>{product.description}</DescriptionText>
            </DescriptionBlock>

            <ButtonWrapper>
                <CloseButton className="icon-close" size={30} onClick={handleRemove} />
                <PriceSection>
                    <ProductPrice price={product.price} discount={product.discount} />
                </PriceSection>
                <StyledButton label="добавить в корзину" onClick={handleAddToBasket} />
            </ButtonWrapper>
        </Wrapper>
    );
});
