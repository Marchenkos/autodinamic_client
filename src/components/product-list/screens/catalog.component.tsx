import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getCategoryNames } from '../../product-category/selectors';
import {  createSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORY_TO_CATEGORY_IMAGES } from '../../../graphql/entities';
import { CategoryNames } from '../../../graphql/interfaces';
import { BodyText, TextWeight } from '../../../ui/text';

const CatalogListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 90vw;
    background: #eeeeee;
`;

const CatalogItemWrapper = styled.div`
    max-width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
`;

const CatalogNameText = styled(BodyText).attrs({ weight: TextWeight.MEDIUM })`
    margin: 10px;
    color: #4a4a4a;
    text-transform: capitalize;
    font-size: 15px;
    

    @media (max-width: 450px) {
        font-size: 17px;
        font-weight: 600;
    }
`;

const CatalogImage = styled.img`
    max-width: 60%;
    overflow: hidden;
    transition: transform 1s;
    transform-origin: center center;

    &:hover {
        transform: scale(1.17);
    }
`;

interface CatalogItemProps {
    categoryName: CategoryNames;
}

const CatalogItem: React.FC<CatalogItemProps> = React.memo(function CatalogItem({ categoryName }: CatalogItemProps) {
    const navigate = useNavigate();
    const image = PRODUCT_CATEGORY_TO_CATEGORY_IMAGES[categoryName.category_name];

    const handleChooseCategory = React.useCallback(() => {
      navigate({
        pathname: "catalog",
        search: `?${createSearchParams({
          category: categoryName.category_name
        })}`
      });
    }, [categoryName, navigate]);

    if (!image) {
        return null;
    }

    return (
        <CatalogItemWrapper onClick={handleChooseCategory}>
            <CatalogImage src={image} />
            <CatalogNameText>{categoryName.title}</CatalogNameText>
        </CatalogItemWrapper>
    );
});

export const Catalog: React.FC = React.memo(function Catalog() {
    const categoryNames = useSelector(getCategoryNames);

    const categoryItems = React.useMemo(
        () =>
            categoryNames
                ? categoryNames.map((item) => <CatalogItem key={item.category_name} categoryName={item} />)
                : null,
        [categoryNames]
    );

    return <CatalogListWrapper>{categoryItems}</CatalogListWrapper>;
});
