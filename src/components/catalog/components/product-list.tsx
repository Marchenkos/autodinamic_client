import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';

import { ProductListItem } from './product-list-item';
import { useSelector } from 'react-redux';
import { getProductList, getProductsCount } from '../selectors';
import { IProduct } from '../../../graphql/entities';
import { BodyText } from '../../../ui/text';
import { ProductListHeader } from './product-list-header';
import { PRODUCTS_PER_PAGE_LIMIT } from './catalog.component';
import { ProductListPagination } from './product-list-pagination';

const CatalogWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`;

const ProductsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    flex-wrap: wrap;
    justify-content: flex-start;
    row-gap: 40px;
    column-gap: 30px;
    padding: 0 30px;

	@media (max-width: 800px) {
		justify-content: space-between;
		padding: 0 10px;
  }
}`;

const CountText = styled(BodyText)`
    font-size: 12px;
    color: #b5b5b5;
    margin: 0 30px 20px;

    @media (max-width: 800px) {
        margin: 10px;
    }
`;

interface ProductListProps {
    isNew: boolean;
    searchTerms?: string[];
    currentPage: number;
}

export const ProductList: React.FC<ProductListProps> = React.memo(function ProductList({
    isNew,
    searchTerms,
    currentPage,
}: ProductListProps) {
    const productList = useSelector(getProductList);
    const productsCount = useSelector(getProductsCount);

    const renderList = useMemo(
        () =>
            productList.map((item: IProduct, index: number) => (
                <ProductListItem isNew={isNew} key={index} product={item} />
            )),
        [productList]
    );

    return (
        <CatalogWrapper>
            <ProductListHeader searchTerms={searchTerms}/>
            {!searchTerms && <CountText>{`Найдено ${productsCount} товаров`}</CountText>}
            <ProductsWrapper>{renderList}</ProductsWrapper>
          <ProductListPagination currentPage={currentPage}/>
        </CatalogWrapper>
    );
});
