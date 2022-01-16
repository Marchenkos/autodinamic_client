import React from 'react';
import styled from 'styled-components';

import { TitleText } from '../../../ui/text';
import { DescriptionByCategory } from './description-by-category';
import './product-details.style.scss';

const ProductSectionTitle = styled(TitleText)`
    padding-left: 25px;
    font-size: 35px;
`;

const Wrapper = styled.div`
    margin: 80px 0;
    display: flex;
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
