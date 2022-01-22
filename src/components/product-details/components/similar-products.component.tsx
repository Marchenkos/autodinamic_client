import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Carousel, { arrowsPlugin, slidesToShowPlugin, slidesToScrollPlugin } from '@brainhubeu/react-carousel';

import '@brainhubeu/react-carousel/lib/style.css';
import { TextColor, TextSize, TextWeight, TitleLink, TitleText } from '../../../ui/text';
import { getSimilarProducts } from '../selectors';
import './product-details.style.scss';
import { SimilarProductItem } from './similar-product-item.component';

const Wrapper = styled.div`
    width: 100%;
    margin: 80px 0;

    @media (max-width: 810px) {
        margin: 40px 0;
    }
`;

const ProductInfoText = styled(TitleLink).attrs({
    weight: TextWeight.DEFAULT,
    color: TextColor.MEDIUM,
    size: TextSize.MEDIUM,
})<{ selected?: boolean }>`
    ${({ selected }) => (selected ? 'color: #5fbdbf' : '')};
    margin-right: 10px;
`;

const ProductSectionTitle = styled(TitleText)`
    margin-bottom: 50px;
    font-size: 35px;
    padding-left: 25px;

    @media (max-width: 810px) {
        margin-bottom: 20px;
    }
`;

const ProductCarousel = styled.div`
    display: flex;
    overflow: scroll;
    overflow-y: hidden;
    margin: 0 auto 15px;
    width: 100%;
    :: -webkit-scrollbar {
        width: 0 !important;
    }
`;

const CarouselArrowWrapper = styled.div<{ isHide?: boolean }>`
    width: 50px;
    height: 50px;
    border: 1px solid black;

    display: ${(props) => (props.isHide ? 'none' : 'block')};
`;

export interface IHeaderLink {
    id: number;
    header: string;
    link: string;
}

interface CarouselArrowProps {
    reverse?: boolean;
    isHide?: boolean;
}

export const CarouselArrow: React.FC<CarouselArrowProps> = React.memo(function CarouselArrow({
    reverse = false,
    isHide = false,
}: CarouselArrowProps) {
    return (
        <CarouselArrowWrapper isHide={isHide}>
            {reverse ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        </CarouselArrowWrapper>
    );
});

export const SimilarProductCarousel: React.FC = React.memo(function SimilarProductCarousel() {
    const similarProducts = useSelector(getSimilarProducts);

    if (!similarProducts) {
        return null;
    }

    return (
        <Wrapper>
            <ProductSectionTitle>Похожие товары</ProductSectionTitle>

            <Carousel
                plugins={[
                    {
                        resolve: arrowsPlugin,
                        options: {
                            arrowLeft: <CarouselArrow reverse isHide={similarProducts.length < 6} />,
                            arrowLeftDisabled: <CarouselArrow isHide />,
                            arrowRight: <CarouselArrow isHide={similarProducts.length < 6} />,
                            arrowRightDisabled: <CarouselArrow isHide />,
                            addArrowClickHandler: true,
                        },
                    },
                    {
                        resolve: slidesToShowPlugin,
                        options: {
                            numberOfSlides: 5,
                        },
                    },
                    {
                        resolve: slidesToScrollPlugin,
                        options: {
                            numberOfSlides: 5,
                        },
                    },
                ]}
            >
                {similarProducts.map((item, index) => (
                    <SimilarProductItem key={index} item={item} />
                ))}
            </Carousel>
        </Wrapper>
    );
});
