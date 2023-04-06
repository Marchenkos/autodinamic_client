import * as React from 'react';

import { PRODUCT_CATEGORY_TO_CATEGORY_IMAGES } from '../graphql/entities';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NewestProductCarousel } from '../components/home/components/newest-products.component';
import { CategoryPromo } from '../components/home/components/category-promo.component';
import { getDiscountProductList } from '../components/catalog/selectors';
import { FETCH_DISCOUNT_PRODUCT_LIST } from '../components/catalog/actions';
import { PRODUCT_CATEGORY_TYPE } from '../graphql/entities';
import { DiscountProductList } from '../components/home/components/discount-product-list.component';
import { backgroundUrl } from '../background-url';

import { BannerButton, BannerButtonTwo, BannerImage, BannerImageWrapper, BannerSubTitle, BannerTitle, BannerTitleWrapper, HeaderText, MainBanner, PromoSection, SalesButton, SalesLink, SalesSpan, SalesTextWrapper, SalesTextWrapperBig, SaleSubTitleText, SaleText, SaleTitleText, SaleWrapper, Wrapper } from './Home.styled-components';

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

    const bannerImage = PRODUCT_CATEGORY_TO_CATEGORY_IMAGES[PRODUCT_CATEGORY_TYPE.BANNER_SUB];
    return (
        <Wrapper>
            <MainBanner backgroundUrl={backgroundUrl}>
                <BannerTitleWrapper>
                    <BannerTitle>мы знаем</BannerTitle>
                    <BannerSubTitle>что нужно твоему автомобилю</BannerSubTitle>
                    <div>
                        <BannerButton to="/catalog/?category=all">В каталог</BannerButton>
                        <BannerButtonTwo to="/contacts">О нас</BannerButtonTwo>
                    </div>
                </BannerTitleWrapper>

                <BannerImageWrapper>
                    <BannerImage src={bannerImage} />
                </BannerImageWrapper>
            </MainBanner>

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
