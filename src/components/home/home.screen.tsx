import { Button } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import { BodyText, TextSize, TextWeight, TitleText } from '../../ui/text';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isSmallDevice } from '../../utils/check-device-size';
import { NewestProductCarousel } from './components/newest-products.component';
import { CategoryPromo } from './components/category-promo.component';
import { getDiscountProductList } from '../product-list/selectors';
import { FETCH_DISCOUNT_PRODUCT_LIST } from '../product-list/actions';
import { PRODUCT_CATEGORY_TYPE } from '../../graphql/entities';
import { DiscountProductList } from './components/discount-product-list.component';
import BannerImg from '../../../public/assets/banner.png';
import { StyledButton } from '../../ui/new-styled';

const Wrapper = styled.div`
    flex-grow: 1;
    width: 100%;
    background: white;
`;

const MainBannerImage = styled.img`
    max-width: 100%;
`;

const SaleWrapper = styled.div`
    box-sizing: border-box;
    margin: 50px 0 50px;
    width: 100%;
    background: #ede735;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
    flex-direction: row;

    @media (max-width: 800px) {
        flex-direction: column;
        margin: 50px 0 30px;
    }
`;

const PromoSection = styled.div`
    width: 100%;
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 50px;
    box-sizing: border-box;

    @media (max-width: 600px) {
        padding: 0 10px;
    }
`;

const MainBanner = styled.div`
    width: 100%;
`;

export const ProductCarousel = styled.div`
    display: flex;
    margin: 0 auto 15px;
    width: 100%;

    overflow: scroll;
    overflow-y: hidden;
    overflow-x: auto;

    ::-webkit-scrollbar {
        height: 6px;
        padding: 10px;
    }
    ::-webkit-scrollbar-track {
        background: rgb(240, 240, 240);
    }
    ::-webkit-scrollbar-thumb {
        background-color: #cee2e2;
        border-radius: 15px;
    }
`;

const SaleText = styled(BodyText).attrs({ size: TextSize.LARGE, weight: TextWeight.BOLD })`
    text-transform: uppercase;
    color: black;
    max-width: 500px;

    font-size: 18px;
    padding-right: 40px;
    box-sizing: border-box;

    @media (max-width: 800px) {
        margin-bottom: 10px;

        font-size: 15px;
        line-height: 27px;
        margin-bottom: 20px;
        text-align: center;

        padding-right: 0px;
    }
`;

const HeaderText = styled(TitleText).attrs({ weight: TextWeight.BOLD })`
    margin-bottom: 35px;
    text-align: center;
    font-size: 25px;

    @media (max-width: 769px) {
        margin-bottom: 30px;
        margin-left: 10px;
        font-size: 20px;
    }
`;

const HomeScreen: React.FC = React.memo(function HomeScreen() {
    const history = useHistory();
    const dispatch = useDispatch();

    const discountProductList = useSelector(getDiscountProductList);

    React.useEffect(() => {
        dispatch(
            FETCH_DISCOUNT_PRODUCT_LIST.TRIGGER({
                limit: 8,
                next: 0,
                categoryName: PRODUCT_CATEGORY_TYPE.ALL,
                sort: '',
                isHasDiscount: true,
            })
        );
    }, [dispatch, discountProductList]);

    const navigateToCatalog = React.useCallback(() => {
        history.push('/catalog/all');
    }, [history]);

    return (
        <Wrapper>
            <MainBanner>
                <MainBannerImage src={BannerImg} />
            </MainBanner>
            <SaleWrapper>
                <SaleText>Зарегистрируйся, оформи свой первый заказ и получи скидку 5%</SaleText>
                <StyledButton additionalStyles={{ width: '200px' }} onClick={navigateToCatalog} label="Выбрать товар" />
            </SaleWrapper>
            <PromoSection>
                <HeaderText>Категории товаров</HeaderText>
                <CategoryPromo />
            </PromoSection>

            <PromoSection>
                <HeaderText>Выгодные предложения</HeaderText>
                <DiscountProductList products={discountProductList} />
            </PromoSection>
        </Wrapper>
    );
});

export default HomeScreen;
