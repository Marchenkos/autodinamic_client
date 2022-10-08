import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { WishlistItem } from './components/wishlist-item.component';
import { GeneralProduct } from '../../../../graphql/entities';
import { PageTitleText } from '../profile/profile.screen';
import { getWishlist } from '../../selectors';
import { EmptyWishlist } from './components/empty-wishlist.component';

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const WishlistWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export const Wishlist: React.FC = React.memo(function Wishlist() {
    const wishlistValue = useSelector(getWishlist);

    if (!wishlistValue) {
        return <EmptyWishlist />;
    }

    return (
        <Wrapper>
            <PageTitleText>Избранные товары</PageTitleText>
            <WishlistWrapper>
                {wishlistValue.map((item: GeneralProduct, index: number) => (
                    <WishlistItem key={index} product={item} />
                ))}
            </WishlistWrapper>
        </Wrapper>
    );
});

export default Wishlist;
