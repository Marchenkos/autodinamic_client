import React from 'react';
import styled from 'styled-components';
import Carousel, { arrowsPlugin, slidesToShowPlugin, slidesToScrollPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { SimilarProductItem } from '../../product-details/components/similar-product-item.component';
import { IProduct } from '../../../graphql/entities';
import { CarouselArrow } from '../../product-details/components/similar-products.component';

const Wrapper = styled.div`
    width: 100%;
    margin: 80px 0;

    @media (max-width: 810px) {
        margin: 40px 0;
    }
`;

export const NewestProductCarousel: React.FC<{ products: IProduct[] }> = React.memo(
    function NewestProductCarousel({ products }) {
        return (
            <Wrapper>
                <Carousel
                    plugins={[
                        {
                            resolve: arrowsPlugin,
                            options: {
                                arrowLeft: <CarouselArrow reverse />,
                                arrowLeftDisabled: <CarouselArrow isHide />,
                                arrowRight: <CarouselArrow />,
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
                    {products.map((item, index) => (
                        <SimilarProductItem key={index} item={item} />
                    ))}
                </Carousel>
            </Wrapper>
        );
    }
);
