import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';

import { TextSize, TextColor, BodyText, TitleText } from '../../../ui/text';
import { ProductListItem } from './product-list-item';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProductListFetching, getProductList, getSearchProductsCount, getProductListError } from '../selectors';

import { SET_FILTER_SECTIONS } from '../../filter/actions';
import { FilterDesktop } from '../../filter/components/filter.desktop.component';
import { getDeviceSize } from '../../../utils/check-device-size';

import { getSelectedFilters, getSelectedSort } from '../../filter/selector';
import { GenericError } from '../../errorUI/generic-error.component';
import { FETCH_PRODUCT_LIST_BY_SEARCH } from '../../search/actions';
import { SearchProductListCatalog } from './search-product-list-catalog';

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
        padding: 0 20px;
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

export const PRODUCTS_PER_PAGE_LIMIT = 8;

interface SearchProductListProps {
    searchTerms: string[];
}

export const SearchProductList: React.FC<SearchProductListProps> = React.memo(function SearchProductList({
    searchTerms,
}: SearchProductListProps) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [next, setNext] = useState(0);
    const deviceSize = getDeviceSize();
    const filters = useSelector(getSelectedFilters);

    const productsCount = useSelector(getSearchProductsCount);
    const selectedSort = useSelector(getSelectedSort);
    const error = useSelector(getProductListError);

    const fetchList = useCallback(() => {
        dispatch(
            FETCH_PRODUCT_LIST_BY_SEARCH.TRIGGER({
                limit: PRODUCTS_PER_PAGE_LIMIT,
                next,
                sort: selectedSort,
                searchTerms,
                filters,
            })
        );
    }, [dispatch, PRODUCTS_PER_PAGE_LIMIT, selectedSort, next, filters, searchTerms]);

    useEffect(() => {
        fetchList();
    }, [selectedSort, next, filters, searchTerms]);

    const handleChangePagination = useCallback(
        (e: any, page: number) => {
            if (currentPage > page) {
                const diff = (currentPage - page) * PRODUCTS_PER_PAGE_LIMIT;

                setNext(next - diff);
                setCurrentPage(page);
            }

            if (currentPage < page) {
                const diff = (page - currentPage) * PRODUCTS_PER_PAGE_LIMIT;

                setNext(next + diff);
                setCurrentPage(page);
            }
        },
        [currentPage, PRODUCTS_PER_PAGE_LIMIT, next]
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
                <SearchProductListCatalog searchTerms={searchTerms} />
            </ProductListContent>

            <PaginationWrapper toEnd={true}>
                {productsCount > PRODUCTS_PER_PAGE_LIMIT && (
                    <Pagination
                        page={currentPage}
                        style={{ outline: 'none !important' }}
                        onChange={handleChangePagination}
                        count={Math.ceil(productsCount / PRODUCTS_PER_PAGE_LIMIT) || 1}
                        size="small"
                    />
                )}
            </PaginationWrapper>
        </ProductListWrapper>
    );
});
