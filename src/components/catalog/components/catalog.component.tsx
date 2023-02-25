import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';

import { TextSize, TextColor, BodyText, TitleText } from '../../../ui/text';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProductListFetching, getProductList, getProductsCount, getProductListError } from '../selectors';
import { FETCH_PRODUCT_LIST } from '../actions';
import { SET_FILTER_SECTIONS } from '../../filter/actions';
import { FilterDesktop } from '../../filter/components/filter.desktop.component';
import { getDeviceSize } from '../../../utils/check-device-size';

import { getSelectedFilters, getSelectedSort } from '../../filter/selector';
import { GenericError } from '../../errorUI/generic-error.component';
import { ICategoryName } from '../../../graphql/interfaces';
import { ProductList } from './product-list';
import { useMatch, useSearchParams } from 'react-router-dom';
import { LoadingState } from '../../../ui/loading-state';

const CatalogWrapper = styled.div`
    display: grid;
    width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    background: #ffffff;
    flex-direction: column;
`;

const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 20px;
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

export const PRODUCTS_PER_PAGE_LIMIT = 21;

interface ICatalogComponentProps {
    category?: ICategoryName;
    isNew?: boolean;
    searchTerms?: string[];
}

export const CatalogComponent: React.FC<ICatalogComponentProps> = React.memo(function CatalogComponent({
    category,
    isNew = false,
    searchTerms,
}) {
    const dispatch = useDispatch();
    const deviceSize = getDeviceSize();
    const filters = useSelector(getSelectedFilters);
    const isFetching = useSelector(getIsProductListFetching);

    const productsCount = useSelector(getProductsCount);
    const selectedSort = useSelector(getSelectedSort);
    const error = useSelector(getProductListError);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = useMemo(() => {
      const pageSearchParam = searchParams.get('page');

      return pageSearchParam ? parseInt(pageSearchParam) : 1;
    }, [searchParams]);

    const smoothScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const fetchList = useCallback(() => {
        dispatch(
            FETCH_PRODUCT_LIST.TRIGGER({
                limit: PRODUCTS_PER_PAGE_LIMIT,
                page: currentPage,
                categoryName: category ? category.name : undefined,
                sort: selectedSort,
                filters,
                isNew,
                searchTerms,
            })
        );
    }, [dispatch, PRODUCTS_PER_PAGE_LIMIT, category, selectedSort, currentPage, filters, isNew, searchTerms]);

    useEffect(() => {
        fetchList();
    }, [category, selectedSort, currentPage, filters, isNew, searchTerms]);

    const handleChangePagination = useCallback(
        (e: any, page: number) => {
          setSearchParams({ page: page.toString() });
          smoothScrollToTop()
        },
        []
    );

    if (error) {
        return <GenericError handleTryAgain={fetchList} />;
    }

    if (isFetching) {
      return <LoadingState />;
    }

    return (
        <CatalogWrapper>
            <ContentWrapper>
                {deviceSize > 850 ? <FilterDesktop /> : null}
                <ProductList searchTerms={searchTerms} isNew={isNew} />
            </ContentWrapper>

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
        </CatalogWrapper>
    );
});
