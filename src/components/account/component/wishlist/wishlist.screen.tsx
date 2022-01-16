import React, { useMemo } from 'react';
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

export const Wishlist: React.FC = React.memo(function Wishlist() {
    const wishlistValue = useSelector(getWishlist);

    if (!wishlistValue) {
        return <EmptyWishlist />;
    }

    return (
        <Wrapper>
            <PageTitleText>Избранные товары</PageTitleText>
            {
                wishlistValue.map((item: GeneralProduct, index: number) => 
                <WishlistItem key={index} product={item} />)
            }
        </Wrapper>
    );
});

export default Wishlist;
