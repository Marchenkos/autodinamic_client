import styled from 'styled-components';

import { StyledLink } from '../../../ui/styled-link.component';
import { TextColor } from '../../../ui/text/TextColor';

export const MenuWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
`;

export const MenuItemDropdown = styled.div`
    position: relative;
    display: inherit;
    &:hover .dropdown-content {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`;

export const MenuItemDropdownContent = styled.div`
    position: absolute;
    background-color: #f9f9f9;
    overflow: hidden;
    border-radius: 0px 0px 6px 6px;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: none;
    left: -450px;
    top: 50px;
`;

export const StyledMenuItemText = styled(StyledLink).attrs({ color: TextColor.DARK })`
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
  font-size: 16px;
  box-sizing: border-box;
  

  :before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0%;
    height: 1.4px;
    width: 0%;
    border-radius: 2px;
    background-color: black;
    transition: all ease-in-out 300ms;  
  }

    &:focus:before, &:hover:before {
        // border-bottom: 2px solid black;
        width: 100%;
    }
}`;
