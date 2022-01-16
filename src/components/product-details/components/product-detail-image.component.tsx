import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { device } from '../../../../public/screen-sizes';
import { ProductImage } from '../../../graphql/entities';
import { getSelectedProduct } from '../selectors';

//TODO tabled = mobile
const Wrapper = styled.div`
    display: flex;
    width: 60%;
    max-width: 900px;

    @media (max-width: 810px) {
        width: 100%;
    }

    @media ${device.laptop} {
        flex-direction: column-reverse;
    }
`;

const StyledImage = styled.img`
    height: auto;
    align-self: flex-start;
`;

const Slider = styled.div`
    width: 300px;

    overflow: scroll;
    overflow-x: hidden;
    overflow-y: auto;
    height: 500px;

    @media (max-width: 810px) {
        display: flex;
        height: 100px;
        padding: 10px 0;
    }
`;

const ImageSlider = styled(StyledImage)<{ isSelected?: boolean }>`
    max-width: 100%;
    margin-top: -25%;
    cursor: pointer;

    @media ${device.laptop} {
        max-width: 80%;
        margin-top: -25%;
    }

    @media (max-width: 810px) {
        max-width: 100%;
    }

    ${({ isSelected }) =>
        isSelected &&
        `
        border: 2px solid #9dd1d2;
    `}
`;

const MainImage = styled(StyledImage)`
    max-width: 100%;
    margin-top: -30%;
    height: auto;

    @media (min-width: 650px) and (max-width: 810px) {
        margin-top: -40%;
    }

    @media (max-width: 550px) {
        margin-top: -20%;
    }
`;

const MainImageWrapper = styled.div`
    height: 500px;
    overflow: hidden;

    @media (max-width: 810px) {
        height: 300px;
    }
`;

const ImageSliderWrapper = styled.div`
    height: 80px;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 5px;

    @media ${device.laptop} {
        max-width: 20%;
        display: flex;
        justify-content: center;
    }

    @media (max-width: 810px) {
        max-width: 30%;
        margin-bottom: 0;
    }
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
            images && images.length > 1
                ? images.map((image: ProductImage, index: number) => {
                      return (
                          <ImageSliderWrapper key={index} onClick={() => setCurrentImage(image.displayUrl)}>
                              <ImageSlider isSelected={image.displayUrl === currentImage} src={image.displayUrl} />
                          </ImageSliderWrapper>
                      );
                  })
                : null,
        [images, currentImage]
    );

    return (
        <Wrapper>
            {images && images.length > 1 ? <Slider className="styled-scroll">{renderSlider()}</Slider> : null}
            <MainImageWrapper>
                <MainImage src={currentImage} />
            </MainImageWrapper>
        </Wrapper>
    );
});
