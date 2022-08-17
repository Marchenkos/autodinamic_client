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
import { MobileSorting } from '../../filter/sort/mobile-sorting.component';
import { MobileFilter } from '../../filter/components/mobile-filter.component';

const CatalogWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 82%;

    @media (max-width: 1400px) {
        width: 75%;
    }

    @media (max-width: 850px) {
        width: 100%;
		justify-content: space-between;
    }
`;

const ConditionSection = styled.div`
    display: flex;

    @media (max-width: 860px) {
       display: none;
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    margin: 20px 30px 20px;
    align-items: center;

    @media (max-width: 860px) {
		margin: 20px 0 0;
		align-items: start;
        flex-direction: column;
    }
`;

const ProductHeader = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-grow: 1;

	@media (max-width: 800px) {
		padding: 0 10px;
    }
`;

const ProductsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

	@media (max-width: 800px) {
		justify-content: space-between;
		padding: 0 10px;
    }
}`;

const MobileFilterAndSortConditions = styled.div`
	width: 100%;
	display: none;
	margin: 10px 0;
	border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
	justify-content: center;
	
	@media (max-width: 800px) {
		display: flex;
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
				<MobileFilterAndSortConditions>
					<MobileSorting />
					<MobileFilter />
				</MobileFilterAndSortConditions>
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
