import styled from 'styled-components';

export const StyledIcons = styled.span<{
    size?: number;
    mainColor?: string;
    hoveredColor?: string;
    noMargins?: boolean;
}>`
    color: ${(props) => (props.mainColor ? props.mainColor : '#fff')};
    font-size: ${(props) => (props.size ? props.size : 20)}px;
    margin: ${(props) => (props.noMargins ? '0px' : '0 15px')};
    cursor: pointer;

    :hover {
        // background-color: ${(props) => (props.hoveredColor ? props.hoveredColor : '#7aa0a1')};
        transform: scale(1.2);
    }
`;
