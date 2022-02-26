import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { GeneralProduct } from '../../../graphql/entities';
import { ProductListItem } from '../../product-list/components/product-list-item';

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
    products: GeneralProduct[]
}

export const DiscountProductList: React.FC<DiscountProductListProps> = React.memo(function DiscountProductList({
    products
}: DiscountProductListProps) {

    const renderList = useMemo(() => products.map((item: GeneralProduct, index: number) => (
        <ProductListItem isNew={false} key={index} product={item} />
    )), [products]);

    return (
        <CatalogWrapper>
            {renderList}
        </CatalogWrapper>
    );
});
