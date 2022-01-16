import styled from 'styled-components';
import { device } from '../../../public/screen-sizes';

import { AppTextProps } from './AppTextProps';
import { TextSize } from './TextSize';
import { TextColor } from './TextColor';

export const HeaderText = styled.div<AppTextProps>`
    text-transform: uppercase;
    font-family: ${(props) => props.theme.text.fonts.default};
    color: ${(props) => props.theme.text.colours[props.color || TextColor.LIGHT]};
    font-size: ${(props) => props.theme.text.fontSize[props.size || TextSize.MEDIUM]}px;
    font-weight: 700;

    @media ${device.mobileM} {
        font-size: ${TextSize.EXTRA_EXTRA_SMALL}px;
    }
`;
