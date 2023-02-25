import { Button } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

import { PRODUCT_CATEGORY_TO_CATEGORY_IMAGES } from '../graphql/entities';
import { BodyText, TextSize, TextWeight } from '../ui/text';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isSmallDevice } from '../utils/check-device-size';
import { NewestProductCarousel } from '../components/home/components/newest-products.component';
import { CategoryPromo } from '../components/home/components/category-promo.component';
import { getDiscountProductList } from '../components/catalog/selectors';
import { FETCH_DISCOUNT_PRODUCT_LIST } from '../components/catalog/actions';
import { PRODUCT_CATEGORY_TYPE } from '../graphql/entities';
import { DiscountProductList } from '../components/home/components/discount-product-list.component';
import BannerImg from '../../public/assets/ban.jpg';
import { StyledButton } from '../ui/new-styled';


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
    // margin: 50px 0 50px;
    width: 100%;
    height: 400px;
    background: #eeeeee;
    display: flex;

    justify-content: space-between;

    // padding: 50px;
    flex-direction: row-reverse;

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

const TitleText = styled.p`
    text-transform: uppercase;
    color: black;
    max-width: 600px;
    margin-top: 60px;
    margin-left: 80px;

    font-size: 38px;
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
const SaleText = styled(BodyText).attrs({ size: TextSize.LARGE, weight: TextWeight.BOLD })`
    text-transform: uppercase;
    color: black;
    max-width: 500px;
    margin-left: 80px;
    font-size: 16px;
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
    margin: 0px 0 35px 30px;
    font-size: 25px;

    @media (max-width: 769px) {
        margin-bottom: 30px;
        margin-left: 10px;
        font-size: 20px;
    }
`;
const CategoryImage = styled.img`
    width: 330px;

    align-self: center;
    border-radius: 50%;
    margin-left: 100px;
    transform: scale(1.2);
    transition: 0.5s;
    &: hover {
        transform: rotate(5deg) scale(1);
    }
    @media (max-width: 800px) {
        max-width: 100px;
    }
`;
const GrayBox = styled.div`
    background-color: #eeeeee;
`;
const HomePage: React.FC = React.memo(function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const discountProductList = useSelector(getDiscountProductList);

    React.useEffect(() => {
        dispatch(
            FETCH_DISCOUNT_PRODUCT_LIST.TRIGGER({
                limit: 8,
                page: 0,
                categoryName: PRODUCT_CATEGORY_TYPE.ALL,
                isHasDiscount: true,
            })
        );
    }, [dispatch, discountProductList]);

    const navigateToCatalog = React.useCallback(() => {
        navigate({
            pathname: 'catalog',
            search: `?${createSearchParams({
                category: 'all',
            })}`,
        });
    }, [navigate]);

    const image = PRODUCT_CATEGORY_TO_CATEGORY_IMAGES[PRODUCT_CATEGORY_TYPE.SOUND_SPEAKER];
    return (
        <Wrapper>
            <MainBanner>
                <MainBannerImage src={BannerImg} />
            </MainBanner>
            <SaleWrapper>
                <div>
                    <TitleText>а ты уже получил свою первую скидку?</TitleText>
                    <SaleText>Зарегистрируйся, оформи свой первый заказ и получи скидку 5%</SaleText>
                    <StyledButton
                        additionalStyles={{
                            width: '150px',
                            color: '#232323',
                            marginLeft: '80px',
                            marginTop: '25px',
                            border: '1px solid black',
                            borderRadius: '6px',
                            background: 'none',
                        }}
                        onClick={navigateToCatalog}
                        label="Выбрать товар"
                    />
                </div>

                <CategoryImage src={image} />
            </SaleWrapper>
            <PromoSection>
                <HeaderText>Категории товаров</HeaderText>
                <CategoryPromo />
            </PromoSection>

            <PromoSection>
                <HeaderText>Выгодные предложения</HeaderText>
                <DiscountProductList products={discountProductList} />
            </PromoSection>
            <PromoSection>
                <HeaderText>Следи за нами в 'Instagram'</HeaderText>
                
            </PromoSection>
        </Wrapper>
    );
});

export default HomePage;
