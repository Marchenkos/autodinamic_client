import React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { TitleText } from '../../../ui/text';
import { capitalizeString } from '../../filter/utilites/formated-string';
import { Sorting } from '../../filter/sort/sorting.component';
import { MobileSorting } from '../../filter/sort/mobile-sorting.component';
import { MobileFilter } from '../../filter/components/mobile-filter.component';
import { getSelectedCategory } from '../../product-category/selectors';

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

interface IProductListHeaderProps {
    searchTerms?: string[];
}

export const ProductListHeader: React.FC<IProductListHeaderProps> = React.memo(function ProductListHeader({
    searchTerms,
}: IProductListHeaderProps) {
    const category = useSelector(getSelectedCategory);

    return (
      <HeaderWrapper>
          <ProductHeader>
              {searchTerms ? (
                  <TitleText>Результаты поиска по запросу "{searchTerms.join(' ')}"</TitleText>
              ) : (
                  <TitleText>{category ? capitalizeString(category.displayName) : 'Каталог товаров'}</TitleText>
              )}
          </ProductHeader>

          <ConditionSection>
              <Sorting />
          </ConditionSection>
          <MobileFilterAndSortConditions>
              <MobileSorting />
              <MobileFilter />
          </MobileFilterAndSortConditions>
      </HeaderWrapper>
            
    );
});
