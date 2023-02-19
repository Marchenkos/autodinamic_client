import * as React from 'react';
import styled from 'styled-components';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { PRODUCT_CATEGORY_TO_CATEGORY_IMAGES, Promotion } from '../../../graphql/entities';
import { CarouselArrow } from '../../product-details/components/similar-products.component';
import { ICategoryName } from 'src/graphql/interfaces';
import { BodyText, TextWeight } from '../../../ui/text';

const CategoryPromoItemWrapper = styled.div`
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const CategoryNameText = styled(BodyText).attrs({ weight: TextWeight.MEDIUM })`
    margin: 20px 0 30px;
    color: #4a4a4a;
    text-transform: capitalize;
    font-size: 15px;

    @media (max-width: 800px) {
        margin: 10px 0;
        font-size: 14px;
    }
`;

const CategoryImage = styled.img`
    max-width: 170px;
    border-radius: 50%;

    @media (max-width: 800px) {
        max-width: 100px;
    }
`;

interface CategoryPromoItemProps {
  categoryName: ICategoryName;
}

export const CategoryPromoItem: React.FC<CategoryPromoItemProps> = React.memo(function CategoryPromoItem({
  categoryName,
}: CategoryPromoItemProps) {
    const navigate = useNavigate();

    const image = PRODUCT_CATEGORY_TO_CATEGORY_IMAGES[categoryName.name];

    const handleChooseCategory = React.useCallback(() => {
        navigate({
          pathname: "catalog",
          search: `?${createSearchParams({
            category: categoryName.name
          })}`
        });
    }, [categoryName, navigate]);

    if (!image) {
        return null;
    }

    return (
        <CategoryPromoItemWrapper onClick={handleChooseCategory}>
            <CategoryImage src={image} />
            <CategoryNameText>{categoryName.displayName}</CategoryNameText>
        </CategoryPromoItemWrapper>
    );
});
