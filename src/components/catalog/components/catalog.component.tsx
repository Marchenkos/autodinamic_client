import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { TextSize, TextColor, BodyText, TitleText } from '../../../ui/text';
import { useDispatch, useSelector } from 'react-redux';
import { getIsProductListFetching, getProductList, getProductsCount, getProductListError } from '../selectors';
import { FETCH_PRODUCT_LIST } from '../actions';
import { FilterDesktop } from '../../filter/components/filter.desktop.component';
import { getDeviceSize } from '../../../utils/check-device-size';

import { getSelectedFilters, getSelectedSort } from '../../filter/selector';
import { GenericError } from '../../errorUI/generic-error.component';
import { ICategoryName } from '../../../graphql/interfaces';
import { ProductList } from './product-list';
import { useSearchParams } from 'react-router-dom';
import { LoadingState } from '../../../ui/loading-state';

const ContentWrapper = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 4fr;
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

    const isFetching = useSelector(getIsProductListFetching);
    const selectedSort = useSelector(getSelectedSort);
    const error = useSelector(getProductListError);
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = useMemo(() => {
      const pageSearchParam = searchParams.get('page');

      return pageSearchParam ? parseInt(pageSearchParam) : 1;
    }, [searchParams]);

    const fetchList = useCallback(() => {
        dispatch(
            FETCH_PRODUCT_LIST.TRIGGER({
                limit: PRODUCTS_PER_PAGE_LIMIT,
                page: currentPage,
                categoryName: category ? category.name : undefined,
                sort: selectedSort,
                filters: [],
                isNew,
                searchTerms,
            })
        );
    }, [dispatch, PRODUCTS_PER_PAGE_LIMIT, category, selectedSort, currentPage, isNew, searchTerms]);

    useEffect(() => {
        fetchList();
    }, [category, selectedSort, currentPage, isNew, searchTerms]);


    if (error) {
        return <GenericError handleTryAgain={fetchList} />;
    }

    if (isFetching) {
      return <LoadingState />;
    }

    return (
      <ContentWrapper>
          <FilterDesktop />
          <ProductList searchTerms={searchTerms} currentPage={currentPage} isNew={isNew} />
      </ContentWrapper>
    );
});
