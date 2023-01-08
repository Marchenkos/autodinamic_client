import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { device } from '../../../../public/screen-sizes';
import { ProductImage } from '../../../graphql/entities';
import { getSelectedProduct } from '../selectors';

//TODO tabled = mobile
const Wrapper = styled.div`
    display: flex;
    width: 50%;

    @media (max-width: 1000px) {
        width: 60%;
    }

    @media (max-width: 850px) {
        width: 100%;
        margin-top: 30px;
    }
`;

const StyledImage = styled.img`
    height: auto;
    align-self: flex-start;
`;

const Slider = styled.div`
    max-width: 15%;
    padding-right: 20px;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;

    @media (max-width: 850px) {
        display: none;
    }
`;

const ImageSlider = styled(StyledImage)<{ isSelected?: boolean }>`
    max-width: 100%;
    cursor: pointer;
    box-sizing: border-box;

    ${({ isSelected }) =>
        isSelected &&
        `
        border: 2px solid #9dd1d2;
    `}
`;

const MainImage = styled(StyledImage)`
    max-width: 60%;
    height: auto;

    @media (max-width: 1000px) {
        max-width: 80%;
    }

    @media (max-width: 850px) {
        max-width: 100%;
    }
`;

const ImageSliderWrapper = styled.div`
    margin-bottom: 5px;
`;

interface ProductDetailsImageProps {
    images?: ProductImage[];
}

export const NULLABLE_IMAGE = 'https://i.ibb.co/H42J7Yd/NULL.jpg';

export const ProductDetailsImage: React.FC<ProductDetailsImageProps> = React.memo(function ProductDetailsImage({
    images,
}: ProductDetailsImageProps) {
    const [currentImage, setCurrentImage] = useState(NULLABLE_IMAGE);

    useEffect(() => {
        if (images) {
            setCurrentImage(images[0].displayUrl);
        }
    }, [images]);

    const renderSlider = useCallback(
        () =>
            [NULLABLE_IMAGE, NULLABLE_IMAGE].map((image: string, index: number) => (
                <ImageSliderWrapper key={index} onClick={() => setCurrentImage(image)}>
                    <ImageSlider isSelected={image === currentImage} src={image} />
                </ImageSliderWrapper>
            )),
        [images, currentImage]
    );

    return (
        <Wrapper>
            <Slider className="styled-scroll">{renderSlider()}</Slider>
            <MainImage src={currentImage} />
        </Wrapper>
    );
});
