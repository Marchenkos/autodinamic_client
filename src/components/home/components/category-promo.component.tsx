import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { CategoryPromoItem } from './category-promo-item.component';
import { getCategoryNames } from '../../product-category/selectors';

const CategoryPromoWrapper = styled.div`
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    gap: 50px;
    width: 100%;

    ::-webkit-scrollbar {
        height: 8px;
        padding: 10px;
    }
    ::-webkit-scrollbar-track {
        background: rgb(240, 240, 240);
    }
    ::-webkit-scrollbar-thumb {
        background-color: #b4b4b4;
        border-radius: 10px;
    }
`;

export const CategoryPromo: React.FC = React.memo(function CategoryPromo() {
    const categoryNames = useSelector(getCategoryNames);

    const categoryItems = React.useMemo(
        () =>
            categoryNames
                ? categoryNames.map((item) => <CategoryPromoItem key={item.category_name} categoryName={item} />)
                : null,
        [categoryNames]
    );

    return <CategoryPromoWrapper>{categoryItems}</CategoryPromoWrapper>;
});
