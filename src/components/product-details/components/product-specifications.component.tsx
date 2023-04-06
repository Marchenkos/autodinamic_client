import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IProduct } from '../../../graphql/entities';

import { BodyText, TitleText } from '../../../ui/text';
import { getSelectedProduct } from '../selectors';
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

interface ProductSpecificationsProps {
    product: IProduct;
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = React.memo(function ProductSpecifications({
    product,
}: ProductSpecificationsProps) {
    return (
        <Wrapper>
            <ProductSectionTitle>Характеристики товара</ProductSectionTitle>
            {product ? (
                <DescriptionByCategory productDetails={product} />
            ) : (
                <BodyText>Извините, дополнительное описание товара еще не добавлено</BodyText>
            )}
        </Wrapper>
    );
});
