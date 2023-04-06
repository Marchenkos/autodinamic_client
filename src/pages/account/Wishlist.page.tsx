import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { WishlistItem } from '../../components/account/component/wishlist/components/wishlist-item.component';
import { IProduct } from '../../graphql/entities';
import { PageTitleText } from './Profile.page';
import { getWishlist } from '../../components/account/selectors';
import { EmptyWishlist } from '../../components/account/component/wishlist/components/empty-wishlist.component';

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const WishlistWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export const WishlistPage: React.FC = React.memo(function WishlistPage() {
    const wishlistValue = useSelector(getWishlist);

    if (!wishlistValue) {
        return <EmptyWishlist />;
    }

    return (
        <Wrapper>
            <PageTitleText>Избранные товары</PageTitleText>
            <WishlistWrapper>
                {wishlistValue.map((item: IProduct, index: number) => (
                    <WishlistItem key={index} product={item} />
                ))}
            </WishlistWrapper>
        </Wrapper>
    );
});

export default WishlistPage;
