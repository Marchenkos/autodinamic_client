import styled from 'styled-components';

import { StyledLink } from '../../../ui/styled-link.component';
import { TextColor } from '../../../ui/text/TextColor';

export const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 25px;
    padding-left: 0px;
`;

export const MenuItemDropdown = styled.div`
    position: relative;
    display: inherit;
    // &:hover .dropdown-content {
    //     display: flex;
    //     flex-direction: column;
    //     gap: 5px;
    // }
    &:has(.activeHover) .dropdown-content {
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
    z-index: 99;
    display: none;
    
    top: 60px;
`;

export const StyledMenuItemText = styled(StyledLink).attrs({ color: TextColor.DARK })`
  font-weight: 500;
  display: flex;
  align-items: center;
  height: 60px;
  position: relative;
  font-size: 16px;
  box-sizing: border-box;
  color: #fff;
  :hover {
    color: #3b9b9d;
  }

  :before {
    content: '';
    display: block;
    position: absolute;
    bottom: 0%;
    height: 1.4px;
    width: 0%;
    border-radius: 2px;
    background-color: #3b9b9d;
    transition: all ease-in-out 300ms;  
  }

    &:focus:before, &:hover:before {
        // border-bottom: 2px solid #3b9b9d;
        
        width: 100%;
    }
}`;
