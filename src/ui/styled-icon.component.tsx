import styled from 'styled-components';

export const StyledIcons = styled.span<{ size?: number }>`
    color: #2c2c2c;
    font-size: ${(props) => (props.size ? props.size : 20)}px;
    margin: 0 15px;
    cursor: pointer;

    :hover {
        color: #7aa0a1;
    }
`;
