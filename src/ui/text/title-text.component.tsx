import styled from 'styled-components';
import { device } from '../../../public/screen-sizes';

import { AppTextProps } from './AppTextProps';
import { TextSize } from './TextSize';
import { TextColor } from './TextColor';

export const TitleText = styled.div<AppTextProps>`
    font-family: ${(props) => props.theme.text.fonts.default};
    color: ${(props) => props.theme.text.colours[props.color || TextColor.DARK]};
    font-size: ${(props) => props.theme.text.fontSize[props.size || TextSize.TITLE]}px;
    font-weight: 600;

    @media ${device.mobileM} {
        font-size: ${TextSize.EXTRA_EXTRA_SMALL}px;
    }
`;

export const TitleLink = styled.a<AppTextProps>`
    font-family: ${(props) => props.theme.text.fonts.default};
    color: ${(props) => props.theme.text.colours[props.color || TextColor.DARK]};
    font-size: ${(props) => props.theme.text.fontSize[props.size || TextSize.TITLE]}px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }

    &:hover {
        color: #bfdbdc;
    }

    @media ${device.mobileM} {
        font-size: ${TextSize.EXTRA_EXTRA_SMALL}px;
    }
`;
