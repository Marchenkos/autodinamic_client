import React from 'react';
import styled from 'styled-components';

import MinusIcon from '../../../public/assets/plus-minus-icon/minus.png';
import PlusIcon from '../../../public/assets/plus-minus-icon/plus.png';
import { device } from '../../../public/screen-sizes';

import { IconTheme } from '../interfaces';

export const ImageStyledComponent = styled.img`
    height: ${(props) => props.theme.icons.subMenuIcon.height}px;
    width: ${(props) => props.theme.icons.subMenuIcon.width}px;
    margin: 0 10px;
    resize-mode: contain;

    @media ${device.laptop} {
        width: 20px;
        height: 20px;
    }

    @media ${device.tablet} {
        width: 15px;
        height: 15px;
    }
`;

/**
 * @param {boolean} isInverted defaults to false
 */
export const PlusIconComponent: React.FC<IconTheme> = ({ isInverted }: IconTheme) => {
    const source = isInverted ? MinusIcon : PlusIcon;

    return <ImageStyledComponent src={source} />;
};
