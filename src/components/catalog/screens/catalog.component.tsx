import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getCategoryNames } from '../../product-category/selectors';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORY_TO_CATEGORY_IMAGES } from '../../../graphql/entities';
import { ICategoryName } from '../../../graphql/interfaces';
import { BodyText, TextWeight } from '../../../ui/text';

const CatalogListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 190px 100px;
    position: relative;

    flex-wrap: wrap;

    background: #464646;
    border-top: 1px solid #eeeeee;
`;

const CatalogItemWrapper = styled.div`
    // max-width: 20%;
    display: flex;

    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
`;


const CatalogNameText = styled(BodyText).attrs({ weight: TextWeight.MEDIUM })`
    text-transform: uppercase;
    position: relative;
    font-size: 28px;
    width: fit-content;
    color: #eeeeee;
   padding-block: 10px;

    
    // :before {
    //     content: '';
    //     display: block;
    //     position: absolute;
    //     bottom: 0;
    //     height: 2px;
    //     width: 0%;
    //     border-radius: 2px;
    //     background-color: #eeeeee;
    //     transition: all ease-in-out 300ms;
    // }

    // &:focus:before,
    // &:hover:before {
    //     // border-bottom: 2px solid #3b9b9d;

    //     width: 100%;
    // }
    @media (max-width: 450px) {
        font-size: 17px;
        font-weight: 600;
    }
`;

const CatalogImage = styled.img`
    max-width: 20%;
    overflow: hidden;
    transition: transform 1s;
    transform-origin: center center;
    border-radius: 8px;

    position: absolute;
    transition: transition ease-in-out .8s linear;
    animation: .8s linear transition;
    @keyframes transition {
        from {
            opacity: 0;
            transform: translateX(-5px)
          }
        
          to {   
            transform: translateX(0px)
          }
    }
    top: 20px;
    right: 13%;
    // &:hover {
    //     transform: scale(1.17);
    // }
`;

interface CatalogItemProps {
    categoryName: ICategoryName;
    onItemClick: () => void;
    index: number;
}

const CatalogItem: React.FC<CatalogItemProps> = React.memo(function CatalogItem({
    categoryName,
    onItemClick,
    index,
}: CatalogItemProps) {
    const navigate = useNavigate();
    const image = PRODUCT_CATEGORY_TO_CATEGORY_IMAGES[categoryName.name];

    const [isHovering, setIsHovering] = React.useState<boolean>(true);
    const [activeLink, setActiveLink] = React.useState<number>(1);

    const handleMouseOver = (i: number) => {
        setIsHovering(true);
        setActiveLink(i)
    };

    const handleMouseOut = () => {
        setIsHovering(false);
        setActiveLink(0)


    };

    const handleChooseCategory = React.useCallback(() => {
      onItemClick()
      navigate({
        pathname: "catalog",
        search: `?${createSearchParams({
          category: categoryName.name
        })}`
      });
    }, [categoryName, navigate, onItemClick]);

    if (!image) {
        return null;
    }

    console.log(image)

    return (
        <CatalogItemWrapper onClick={handleChooseCategory}>
            <CatalogNameText className={index === activeLink ? 'activeLink' : ''} onMouseOver={() => handleMouseOver(index)} onMouseOut={handleMouseOut}>
                {categoryName.displayName}
            </CatalogNameText>

            
            {index === activeLink && <CatalogImage src={image} />}
        </CatalogItemWrapper>
    );
});

export interface CatalogProps {
    onItemClick: () => void;
}

export const Catalog: React.FC<CatalogProps> = React.memo(function Catalog({ onItemClick }: CatalogProps) {
    const categoryNames = useSelector(getCategoryNames);


    const categoryItems = React.useMemo(
        () =>
            categoryNames
                ? categoryNames.map((item, index) => (
                      <CatalogItem index={index} onItemClick={onItemClick} key={item.name} categoryName={item} />
                  ))
                : null,
        [categoryNames, onItemClick]
    );

    return <CatalogListWrapper>{categoryItems}</CatalogListWrapper>;
});
