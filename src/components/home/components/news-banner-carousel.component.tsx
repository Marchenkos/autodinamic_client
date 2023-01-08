import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import Carousel, { arrowsPlugin, slidesToShowPlugin, slidesToScrollPlugin, Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { useSelector } from 'react-redux';
import { Promotion } from '../../../graphql/entities';
import { useNavigate } from 'react-router-dom';
import { CarouselArrow } from '../../product-details/components/similar-products.component';

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BannerImg = styled.img`
    max-width: 100%;
`;

export const NewsBanners: React.FC<{ news: Promotion[] }> = React.memo(function NewsBanners({ news }) {
    const history = useNavigate();
    const [value, setValue] = React.useState(0);

    const handleOnChange = React.useCallback((value: number) => {
        setValue(value);
    }, []);

    const navigateToNewsDetails = React.useCallback(
        (newsItem: Promotion) => {
            history(`/news/${newsItem.id}`);
        },
        [history]
    );

    return <Carousel value={value} onChange={handleOnChange}></Carousel>;
});
