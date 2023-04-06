import React, { useMemo } from 'react';
import styled from 'styled-components';

import { ProductListItem } from './product-list-item';
import { useSelector } from 'react-redux';
import { getIsSearchProductListFetching, getSearchProductList, getSearchProductsCount } from '../selectors';
import { IProduct } from '../../../graphql/entities';
import { ProductListEmpty } from './product-list-empty';
import { LoadingState } from '../../../ui/loading-state';
import { BodyText, TitleText } from '../../../ui/text';
import { Sorting } from '../../filter/sort/sorting.component';

const CatalogWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 82%;

    @media (max-width: 1400px) {
        width: 75%;
    }

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const ConditionSection = styled.div`
    display: flex;

    @media (max-width: 860px) {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 20px;
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    margin: 20px 30px 20px;
    align-items: center;

    @media (max-width: 860px) {
        flex-direction: column;
    }
`;

const ProductHeader = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-grow: 1;
`;

const ProductsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const CountText = styled(BodyText)`
    font-size: 12px;
    color: #b5b5b5;
    margin: 0 30px 20px;
`;

interface SearchProductListCatalogProps {
    searchTerms: string[];
}

export const SearchProductListCatalog: React.FC<SearchProductListCatalogProps> = React.memo(
    function SearchProductListCatalog({ searchTerms }: SearchProductListCatalogProps) {
        const productList = useSelector(getSearchProductList);
        const isFetching = useSelector(getIsSearchProductListFetching);
        const searchString = useMemo(() => searchTerms.join(' '), [searchTerms]);
        const productsCount = useSelector(getSearchProductsCount);

        const renderList = useMemo(
            () =>
                productList.map((item: IProduct, index: number) => (
                    <ProductListItem isNew={false} key={index} product={item} />
                )),
            [productList]
        );

        if (isFetching) {
            <LoadingState />;
        }

        return (
            <CatalogWrapper>
                <HeaderWrapper>
                    <ProductHeader>
                        <TitleText>Поиск "{searchString}"</TitleText>
                    </ProductHeader>
                    <ConditionSection>
                        <Sorting />
                    </ConditionSection>
                </HeaderWrapper>
                <CountText>{`Найдено ${productsCount} товаров по запросу ${searchString}`}</CountText>
                <ProductsWrapper>{renderList}</ProductsWrapper>
            </CatalogWrapper>
        );
    }
);
