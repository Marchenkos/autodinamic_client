import React from 'react';
import styled from 'styled-components';

import { TitleText } from '../../../ui/text';

const Wrapper = styled.div`
    padding: 50px;
    box-sizing: border-box;
    width: 80%;
`;

const HeaderText = styled(TitleText)`
    font-size: 22px;
    color: #a9a9a9;
    font-weight: 400;
    text-align: center;

    @media (max-width: 860px) {
        font-size: 16px;
        text-align: center;
    }
`;

export const ProductListEmpty: React.FC = React.memo(function ProductListEmpty() {
    return (
        <Wrapper>
            <HeaderText>К сожалению мы не нашли товары по Вашему запросу.</HeaderText>
            <HeaderText>Попробуйте изменить условия поиска.</HeaderText>
        </Wrapper>
    );
});
