import * as React from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { PRODUCT_CATEGORY_TO_CATEGORY_IMAGES, Promotion } from '../../../graphql/entities';
import { useHistory } from 'react-router-dom';
import { CarouselArrow } from '../../product-details/components/similar-products.component';
import { CategoryNames } from 'src/graphql/interfaces';
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
    categoryName: CategoryNames;
}

export const CategoryPromoItem: React.FC<CategoryPromoItemProps> = React.memo(function CategoryPromoItem({
    categoryName,
}: CategoryPromoItemProps) {
    const history = useHistory();

    const image = PRODUCT_CATEGORY_TO_CATEGORY_IMAGES[categoryName.category_name];

    const handleChooseCategory = React.useCallback(() => {
        history.push(`catalog/${categoryName.category_name}`);
    }, [categoryName, history]);

    if (!image) {
        return null;
    }

    return (
        <CategoryPromoItemWrapper onClick={handleChooseCategory}>
            <CategoryImage src={image} />
            <CategoryNameText>{categoryName.title}</CategoryNameText>
        </CategoryPromoItemWrapper>
    );
});
