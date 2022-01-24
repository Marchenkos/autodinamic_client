import styled from 'styled-components';

export const StyledIcons = styled.span<{ size?: number, mainColor?: string, onHoverColor?: string }>`
    color: ${(props) => (props.mainColor ? props.mainColor : '#2c2c2c')};
    font-size: ${(props) => (props.size ? props.size : 20)}px;
    margin: 0 15px;
    cursor: pointer;

    :hover {
        color: ${(props) => (props.onHoverColor ? props.onHoverColor : '#7aa0a1')};
    }
`;
