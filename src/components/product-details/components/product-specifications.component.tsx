import React from 'react';
import styled from 'styled-components';

import { TitleText } from '../../../ui/text';
import { DescriptionByCategory } from './description-by-category';
import './product-details.style.scss';

const ProductSectionTitle = styled(TitleText)`
	font-size: 25px;
    margin-bottom: 30px;
    font-weight: 500;
`;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 50px 0 0;
	background: #fafafa;
	padding: 30px 0;
`;
export interface IHeaderLink {
    id: number;
    header: string;
    link: string;
}

export const ProductSpecifications: React.FC = React.memo(function ProductSpecifications() {
    return (
        <Wrapper>
            <ProductSectionTitle>Характеристики товара</ProductSectionTitle>
            <DescriptionByCategory />
        </Wrapper>
    );
});
