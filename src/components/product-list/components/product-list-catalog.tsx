import React, { useMemo } from 'react';
import styled from 'styled-components';

import { ProductListItem } from './product-list-item';
import { useSelector } from 'react-redux';
import { getIsProductListFetching, getProductList } from '../selectors';
import { GeneralProduct } from '../../../graphql/entities';
import { ProductListEmpty } from './product-list-empty';
import { LoadingState } from '../../../ui/loading-state';

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
    }
`;

interface ProductListCatalogProps {
    isNew: boolean
}

export const ProductListCatalog: React.FC<ProductListCatalogProps> = React.memo(function ProductListCatalog({
    isNew
}: ProductListCatalogProps) {
    const productList = useSelector(getProductList);
    const isFetching = useSelector(getIsProductListFetching);

    const renderList = useMemo(() => productList.map((item: GeneralProduct, index: number) => (
        <ProductListItem isNew={isNew} key={index} product={item} />
    )), [productList]);


    if (productList.length < 1) {
        return <ProductListEmpty />;
    }

    return (
        <CatalogWrapper>
            {renderList}
        </CatalogWrapper>
    );
});
