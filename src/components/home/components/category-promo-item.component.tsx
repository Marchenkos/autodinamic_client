import * as React from 'react';
import styled from 'styled-components';
import { useNavigate, createSearchParams } from 'react-router-dom';

import { PRODUCT_CATEGORY_TO_CATEGORY_IMAGES } from '../../../graphql/entities';
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
    width: 100%;
    height: 100%;
    border-radius: 50%; 
    transition: .5s;
    
    &:hover {
        transform: scale(1.2);
    }
    @media (max-width: 800px) {
        max-width: 100px;
    }
`;
const ImageWrapper = styled.div`
    max-width: 160px;
    max-height: 160px;
    border: 3px solid #fff;
    border-radius: 50%; 
    overflow: hidden;
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
            <ImageWrapper>
              <CategoryImage src={image} />
            </ImageWrapper>
            <CategoryNameText>{categoryName.displayName}</CategoryNameText>
        </CategoryPromoItemWrapper>
    );
});
