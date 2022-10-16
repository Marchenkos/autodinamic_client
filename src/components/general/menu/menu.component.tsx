import React, { useMemo } from 'react';

import { menuConfig, MenuConfig } from './menu.config';
import { StyledMenuItemText, MenuItemDropdown, MenuItemDropdownContent, MenuWrapper } from './menu.styled';

interface MenuItemProps {
    item: MenuConfig;
}

export const MenuItem: React.FC<MenuItemProps> = React.memo(function MenuItem({ item }: MenuItemProps) {
  const url = useMemo(() => {
    let urlValue = item.url;

    if (item.searchParams) {
      const searchParams = new URLSearchParams();
      item.searchParams.map(s_p => {
        searchParams.append(s_p.param, s_p.value);

      })

      urlValue += `/?${searchParams.toString()}`
    }

    return urlValue;
  }, [item.searchParams, item.url]);

  if (!item.subLinks || item.subLinks.length < 0) {
    return <StyledMenuItemText to={url}>{item.name}</StyledMenuItemText>;
  }

    return (
        <MenuItemDropdown>
            <StyledMenuItemText to={url}>{item.name}</StyledMenuItemText>
            <MenuItemDropdownContent className="dropdown-content">
                {item.component
                    ? item.component
                    : item.subLinks.map((subLink, index) => (
                          <MenuItem item={subLink} key={`${subLink.name}-${index}`} />
                      ))}
            </MenuItemDropdownContent>
        </MenuItemDropdown>
    );
});

export const Menu: React.FC = React.memo(function Menu() {
    const menuContent = useMemo(() => 
      menuConfig.map((item, index: number) => <MenuItem item={item} key={`${item.name}-${index}`} />
    ), [menuConfig]);

    return <MenuWrapper>{menuContent}</MenuWrapper>;
});
