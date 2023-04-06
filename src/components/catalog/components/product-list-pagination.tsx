import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';

import { useSelector } from 'react-redux';
import { getProductsCount } from '../selectors';

import { PRODUCTS_PER_PAGE_LIMIT } from './catalog.component';
import { useSearchParams } from 'react-router-dom';

const PaginationWrapper = styled.div<{ hide?: boolean; toEnd?: boolean }>`
    ${({ hide }) => hide && `display: none;`}
    ${({ toEnd }) => toEnd && `align-self: flex-end;`}

    @media (max-width: 860px) {
        align-self: flex-end;
    }
`;

interface ProductListPaginationProps {
    currentPage: number;
}

export const ProductListPagination: React.FC<ProductListPaginationProps> = function ProductListPagination({
    currentPage,
}: ProductListPaginationProps) {
    const productsCount = useSelector(getProductsCount);
    const [_, setSearchParams] = useSearchParams();

    const smoothScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    const handleChangePagination = useCallback(
      (e: any, page: number) => {
        setSearchParams({ page: page.toString() });
        smoothScrollToTop()
      },
      []
  );

    return (
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
    );
};
