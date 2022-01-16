import styled from 'styled-components';
import { device } from '../../../public/screen-sizes';

import { AppTextProps } from './AppTextProps';
import { TextColor } from './TextColor';
import { TextSize } from './TextSize';
import { TextWeight } from './TextWeight';

export const BodyText = styled.div<AppTextProps>`
    font-family: ${(props) => props.theme.text.fonts.default};
    color: ${(props) => props.theme.text.colours[props.color || TextColor.MEDIUM]};
    font-size: ${(props) => props.theme.text.fontSize[props.size || TextSize.MEDIUM]}px;
    padding: 2px 0;
    font-weight: ${(props) => props.theme.text.fontWeight[props.weight || TextWeight.DEFAULT]};

    @media ${device.mobileM} {
        font-size: ${TextSize.EXTRA_EXTRA_SMALL}px;
    }
`;

export const BodyTextSpan = styled.span<AppTextProps>`
    font-family: ${(props) => props.theme.text.fonts.default};
    color: ${(props) => props.theme.text.colours[props.color || TextColor.MEDIUM]};
    font-size: ${(props) => props.theme.text.fontSize[props.size || TextSize.MEDIUM]}px;
    padding: 2px 0;
    font-weight: ${(props) => props.theme.text.fontWeight[props.weight || TextWeight.BOLD]};

    @media ${device.mobileM} {
        font-size: ${TextSize.EXTRA_EXTRA_SMALL}px;
    }
`;

export const BoldSmallText = styled(BodyTextSpan).attrs({ size: TextSize.EXTRA_SMALL, color: TextColor.MEDIUM })``;

export const CrossedBodyText = styled(BodyText)`
    text-decoration: line-through;
`;

export const BodyLink = styled.a<AppTextProps>`
    font-family: ${(props) => props.theme.text.fonts.default};
    color: ${(props) => props.theme.text.colours[props.color || TextColor.MEDIUM]};
    font-size: ${(props) => props.theme.text.fontSize[props.size || TextSize.MEDIUM]}px;
    padding: 2px 0;
    font-weight: ${(props) => props.theme.text.fontWeight[props.weight || TextWeight.BOLD]};
    cursor: pointer;

    @media ${device.mobileM} {
        font-size: ${TextSize.EXTRA_EXTRA_SMALL}px;
    }

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }

    &:focus,
    &:hover {
        color: #5da5a7;
    }
`;

export const InputLabel = styled(BodyText).attrs({
    size: TextSize.EXTRA_EXTRA_SMALL,
    color: TextColor.DARK,
})<AppTextProps>`
    margin-bottom: 5px;
    margin-top: 5px;
`;
