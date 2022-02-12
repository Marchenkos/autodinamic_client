import * as React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getCategoryNames } from '../../product-category/selectors';
import { useHistory } from 'react-router-dom';
import { PRODUCT_CATEGORY_TO_CATEGORY_IMAGES } from '../../../graphql/entities';
import { CategoryNames } from '../../../graphql/interfaces';
import { BodyText, TextWeight, TitleText } from '../../../ui/text';

const Wrapper = styled.div`
    width: 100%;
    padding: 50px;

    flex-grow: 1;
    width: 100%;
    background: white;
	box-sizing: border-box;
`;

const CatalogListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    width: 100%;

	@media (max-width: 900px) {
		align-items: center;
		justify-content: center;
	}
`;

const CatalogItemWrapper = styled.div`
    max-width: 25%;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
	box-sizing: border-box;
	overflow: hidden;

	@media (max-width: 900px) {
		max-width: 30%;
	}

	@media (max-width: 700px) {
		max-width: 40%;
	}

	@media (max-width: 450px) {
		max-width: 90%;
		padding-right: 0px;
	}
`;

const CatalogNameText = styled(BodyText).attrs({ weight: TextWeight.MEDIUM })`
    margin: 10px 0 30px;
    color: #4a4a4a;
    text-transform: capitalize;
    font-size: 15px;

	@media (max-width: 450px) {
		font-size: 17px;
		font-weight: 600;
	}
`;

const CatalogImageWrapper = styled.div`
	overflow: hidden;
`;

const CatalogImage = styled.img`
    max-width: 100%;

	transition: transform 1s;
	transform-origin: center center;

	&:hover {
		transform: scale(1.2);
	}
`;

interface CatalogItemProps {
    categoryName: CategoryNames;
}

const CatalogItem: React.FC<CatalogItemProps> = React.memo(function CatalogItem({
    categoryName
}: CatalogItemProps) {
    const history = useHistory();

    const image = PRODUCT_CATEGORY_TO_CATEGORY_IMAGES[categoryName.category_name];

    const handleChooseCategory = React.useCallback(() => {
        history.push(`catalog/${categoryName.category_name}`);
    }, [categoryName, history]);

    if (!image) {
        return null;
    }

    return (
       <CatalogItemWrapper onClick={handleChooseCategory}>
		   <CatalogImageWrapper>
           		<CatalogImage src={image} />
		   </CatalogImageWrapper>
           <CatalogNameText>{categoryName.title}</CatalogNameText>
       </CatalogItemWrapper>
    );
});


const CatalogScreen: React.FC = React.memo(function CatalogScreen() {
    const categoryNames = useSelector(getCategoryNames);

    const categoryItems = React.useMemo(() => categoryNames ? 
        categoryNames.map((item) => <CatalogItem key={item.category_name} categoryName={item}/>)
    : null, [categoryNames]);

    return (
       <Wrapper>
            <TitleText>Каталог товаров</TitleText>

           <CatalogListWrapper>
               {categoryItems}
           </CatalogListWrapper>
       </Wrapper>
    );
});

export default CatalogScreen;
