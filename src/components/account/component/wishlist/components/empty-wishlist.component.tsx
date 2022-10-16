import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { StyledButton } from '../../../../../ui/new-styled';
import { StyledIcons } from '../../../../../ui/styled-icon.component';
import { BodyText } from '../../../../../ui/text';
import { PageTitleText } from '../../../../../pages/account/Profile.page';

const StyledDescription = styled(BodyText)`
    font-size: 15px;
    color: #9a9a9a;
    font-weight: 400;
    margin-bottom: 50px;
`;

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const BlockWrapper = styled(Wrapper)`
    display: flex;

    @media (max-width: 850px) {
        flex-direction: column;
    }
`;

export const EmptyWishlist: React.FC = React.memo(function EmptyWishlist() {
    const navigate = useNavigate();

    const goToCatalog = useCallback(() => {
      navigate({
        pathname: "catalog",
        search: `?${createSearchParams({
          category: "all"
        })}`
      });
    }, [navigate]);

    return (
        <Wrapper>
            <PageTitleText>Избранные товары</PageTitleText>

            <StyledDescription>
                На данный момент у Вас нет избранных товаров. Чтобы добавить их, перейдите в "Каталог", выберите товар и
                нажмите "Добавить в избранные", либо на иконку
                <StyledIcons className="icon-heart-o" />
            </StyledDescription>

            <StyledButton additionalStyles={{ width: '300px' }} onClick={goToCatalog} label="Перейти в каталог" />
        </Wrapper>
    );
});
