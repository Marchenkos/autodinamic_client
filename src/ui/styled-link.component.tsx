import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { TextColor, TextSize } from './text';

export const StyledLink = styled(NavLink)`
    text-decoration: none;
    font-family: ${(props) => props.theme.text.fonts.default};
    color: ${(props) => props.theme.text.colours[props.color || TextColor.MEDIUM]};

    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
    }
`;
