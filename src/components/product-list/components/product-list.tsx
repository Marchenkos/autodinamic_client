import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';

import { TextSize, TextColor, BodyText, TitleText } from '../../../ui/text';
import { ProductListItem } from './product-list-item';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProductListFetching, getProductList, getProductsCount, getProductListError } from '../selectors';
import { FETCH_PRODUCT_LIST } from '../actions';
import { ProductListEmpty } from './product-list-empty';
import { SET_FILTER_SECTIONS } from '../../filter/actions';
import { FilterDesktop } from '../../filter/components/filter.desktop.component';
import { getDeviceSize } from '../../../utils/check-device-size';

import { getSelectedFilters, getSelectedSort } from '../../filter/selector';
import { GenericError } from '../../errorUI/generic-error.component';
import { CategoryNames } from '../../../graphql/interfaces';
import { ProductListCatalog } from './product-list-catalog';

const ProductListWrapper = styled.div`
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 0 50px;
    box-sizing: border-box;
    background: #ffffff;
    flex-direction: column;

    @media (max-width: 1400px) {
        padding: 0 50px;
    }

    @media (max-width: 850px) {
        padding: 0;
    }
`;

const ProductListContent = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const PaginationWrapper = styled.div<{ hide?: boolean; toEnd?: boolean }>`
    ${({ hide }) => hide && `display: none;`}
    ${({ toEnd }) => toEnd && `align-self: flex-end;`}

    @media (max-width: 860px) {
        align-self: flex-end;
    }
`;

export const FilterTitle = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.DARK })`
    margin-top: 6px;
    margin-right: 10px;
`;

export const SortTitle = styled(FilterTitle)`
    min-width: 150px;
    margin-right: 0px;
`;

export const LIMIT_PR_PAGE = 8;

interface ProductListProps {
    category: CategoryNames;
    isNew?: boolean;
    searchTerms?: string[]
}

export const ProductList: React.FC<ProductListProps> = React.memo(function ProductList({ 
    category,
    isNew = false,
    searchTerms
}) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [next, setNext] = useState(0);
    const deviceSize = getDeviceSize();
    const filters = useSelector(getSelectedFilters);

    const productsCount = useSelector(getProductsCount);
    const selectedSort = useSelector(getSelectedSort);
    const error = useSelector(getProductListError);

    useEffect(() => {
        setCurrentPage(1);
        setNext(0);
    }, [category]);

    const fetchList = useCallback(() => {
        dispatch(
            FETCH_PRODUCT_LIST.TRIGGER({
                limit: LIMIT_PR_PAGE,
                next,
                categoryName: category.category_name,
                sort: selectedSort,
                filters,
                isNew,
                searchTerms
            })
        );
    }, [dispatch, LIMIT_PR_PAGE, category, selectedSort, next, filters, isNew, searchTerms]);

    useEffect(() => {
        fetchList();
    }, [category, selectedSort, next, filters, isNew, searchTerms]);

    const handleChangePagination = useCallback(
        (e: any, page: number) => {
            if (currentPage > page) {
                const diff = (currentPage - page) * LIMIT_PR_PAGE;

                setNext(next - diff);
                setCurrentPage(page);
            }

            if (currentPage < page) {
                const diff = (page - currentPage) * LIMIT_PR_PAGE;

                setNext(next + diff);
                setCurrentPage(page);
            }
        },
        [currentPage, LIMIT_PR_PAGE, next]
    );

    const handleCleanFilter = useCallback(() => {
        dispatch(SET_FILTER_SECTIONS(undefined));
    }, [dispatch]);

    if (error) {
        return <GenericError handleTryAgain={fetchList} />;
    }

    return (
        <ProductListWrapper>
            <ProductListContent>
                {deviceSize > 850 ? <FilterDesktop cleanFilter={handleCleanFilter} /> : null}
                <ProductListCatalog category={category} searchTerms={searchTerms} isNew={isNew} />
            </ProductListContent>

            <PaginationWrapper toEnd={true}>
                {productsCount > LIMIT_PR_PAGE && (
                    <Pagination
                        page={currentPage}
                        style={{ outline: 'none !important' }}
                        onChange={handleChangePagination}
                        count={Math.ceil(productsCount / LIMIT_PR_PAGE) || 1}
                        size="small"
                    />
                )}
            </PaginationWrapper>
        </ProductListWrapper>
    );
});
