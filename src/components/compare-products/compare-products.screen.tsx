import React from 'react';
import styled from 'styled-components';

import { TitleText } from '../../ui/text';
import { useCompareListData } from './use-compare-list.hook';

const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    padding: 40px 100px;
`;

const CompareProductsScreen: React.FC = React.memo(function CompareProductsScreen() {
    const { data, count, refresh, isFetching } = useCompareListData();

    console.log(data);

    return (
        <Wrapper>
            <TitleText style={{ marginBottom: '20px' }}>Сравнение товаров</TitleText>
        </Wrapper>
    );
});

export default CompareProductsScreen;
