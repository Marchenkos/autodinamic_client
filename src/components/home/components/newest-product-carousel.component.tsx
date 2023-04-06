import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { IProduct } from '../../../graphql/entities';
import { ProductListItem } from '../../catalog/components/product-list-item';

const CatalogWrapper = styled.div`
    display: flex;
    width: 82%;
    flex-wrap: wrap;
    justify-content: flex-start;

    @media (max-width: 1400px) {
        width: 75%;
    }

    @media (max-width: 850px) {
        width: 100%;
        justify-content: space-between;
    }
`;

interface DiscountProductListProps {
    products: IProduct[];
}

export const NewestProductCarousel: React.FC<DiscountProductListProps> = React.memo(function NewestProductCarousel({
  products,
}: DiscountProductListProps) {

  useEffect(() => {
    
  }, []);

    const renderList = useMemo(
        () =>
            products.map((item: IProduct, index: number) => (
                <ProductListItem isNew={false} key={index} product={item} />
            )),
        [products]
    );

    return <CatalogWrapper>{renderList}</CatalogWrapper>;
});
