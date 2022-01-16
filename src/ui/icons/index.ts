import { device } from '../../../public/screen-sizes';
import styled from 'styled-components';

export const ImageStyledComponent = styled.img`
    height: ${(props) => props.theme.icons.subMenuIcon.height}px;
    width: ${(props) => props.theme.icons.subMenuIcon.width}px;
    margin: 0 10px;
    resize-mode: contain;

    @media ${device.tablet} {
        width: ${(props) => props.theme.icons.subMenuIcon.mobile.width}px;
        height: ${(props) => props.theme.icons.subMenuIcon.mobile.height}px;
    }

    @media ${device.mobileM} {
        width: ${(props) => props.theme.icons.subMenuIcon.mobile.width - 5}px;
        height: ${(props) => props.theme.icons.subMenuIcon.mobile.height - 5}px;
    }
`;
