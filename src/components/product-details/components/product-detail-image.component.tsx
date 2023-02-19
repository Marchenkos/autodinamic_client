import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { device } from '../../../../public/screen-sizes';
import { ProductImage } from '../../../graphql/entities';
import { getSelectedProduct } from '../selectors';
import img1 from '../../../../public/assets/test/1.JPG';
import img2 from '../../../../public/assets/test/2.JPG';
import img3 from '../../../../public/assets/test/3.JPG';
import img4 from '../../../../public/assets/test/4.JPG';
import img5 from '../../../../public/assets/test/5.JPG';
import img6 from '../../../../public/assets/test/6.JPG';
import img7 from '../../../../public/assets/test/7.JPG';
import img8 from '../../../../public/assets/test/8.JPG';
import test_img from '../../../../public/assets/ex_1.png';
import test2_img from '../../../../public/assets/ex_2.png';

const StyledImage = styled.img`
    height: auto;
    align-self: flex-start;
`;

const Slider = styled.div`
  display: flex;
  column-gap: 10px;
    max-width: 100%;
    margin-top: 10px;
    overflow: scroll;
    overflow-y: hidden;
    overflow-yx auto;
    box-sizing: border-box;

    @media (max-width: 850px) {
        display: none;
    }
`;

const ImageSlider = styled(StyledImage)<{ isSelected?: boolean }>`
    max-width: 20%;
    cursor: pointer;
    box-sizing: border-box;

    ${({ isSelected }) =>
        isSelected &&
        `
        border: 2px solid #9dd1d2;
    `}
`;

const MainImage = styled(StyledImage)`
    max-width: 100%;
    height: auto;

    @media (max-width: 1000px) {
        max-width: 80%;
    }

    @media (max-width: 850px) {
        max-width: 100%;
    }
`;

const MainImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

interface ProductDetailsImageProps {
    images?: ProductImage[];
}

export const NULLABLE_IMAGE = 'https://i.ibb.co/H42J7Yd/NULL.jpg';

export const ProductDetailsImage: React.FC<ProductDetailsImageProps> = React.memo(function ProductDetailsImage({
    images,
}: ProductDetailsImageProps) {
    const [currentImage, setCurrentImage] = useState(test2_img);

    useEffect(() => {
        if (images) {
            setCurrentImage(images[0].displayUrl);
        }
    }, [images]);

    const renderSlider = useMemo(
        () =>
            [test2_img, test_img, test_img].map((image: string, index: number) => (
              <ImageSlider onClick={() => setCurrentImage(image)} isSelected={image === currentImage} src={image} />
            )),
        [images, currentImage]
    );

    return (
        <>
          <MainImageWrapper>
            <MainImage src={currentImage} />
          </MainImageWrapper>
          <Slider className="styled-scroll">{renderSlider}</Slider>
        </>
    );
});
