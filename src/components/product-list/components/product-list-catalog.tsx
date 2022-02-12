import React, { useMemo } from 'react';
import styled from 'styled-components';

import { ProductListItem } from './product-list-item';
import { useSelector } from 'react-redux';
import { getIsProductListFetching, getProductList, getProductsCount } from '../selectors';
import { GeneralProduct } from '../../../graphql/entities';
import { ProductListEmpty } from './product-list-empty';
import { LoadingState } from '../../../ui/loading-state';
import { BodyText, TitleText } from '../../../ui/text';
import { capitalizeString } from '../../filter/utilites/formated-string';
import { Sorting } from '../../filter/sort/sorting.component';
import { CategoryNames } from '../../../graphql/interfaces';

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

interface ProductListCatalogProps {
    isNew: boolean,
    searchTerms?: string[]
    category: CategoryNames;
}

export const ProductListCatalog: React.FC<ProductListCatalogProps> = React.memo(function ProductListCatalog({
    isNew,
    searchTerms,
    category
}: ProductListCatalogProps) {
    const productList = useSelector(getProductList);
    const isFetching = useSelector(getIsProductListFetching);
    const productsCount = useSelector(getProductsCount);

    const renderList = useMemo(() => productList.map((item: GeneralProduct, index: number) => (
        <ProductListItem isNew={isNew} key={index} product={item} />
    )), [productList]);

    if (isFetching) {
        <LoadingState />
    }


    if (productList.length < 1) {
        return <ProductListEmpty />;
    }


    return (
        <CatalogWrapper>
            <HeaderWrapper>
                <ProductHeader>
                {searchTerms ? <TitleText>Результаты поиска по запросу "{searchTerms.join(" ")}"</TitleText> :
                    <TitleText>{capitalizeString(category.title)}</TitleText>}
                </ProductHeader>

                <ConditionSection>
                    <Sorting />
                </ConditionSection>
            </HeaderWrapper>
            {
                !searchTerms && (<CountText>{`Найдено ${productsCount} товаров`}</CountText>)
            }
            <ProductsWrapper>
                {renderList}
            </ProductsWrapper>
        </CatalogWrapper>
    );
});
