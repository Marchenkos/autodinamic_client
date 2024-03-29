import React, { useState } from 'react';
import styled from 'styled-components';

export const SwitcherLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const Switcher = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }

  &:checked + span {
    background: lime; // <Thing> next to <Thing>
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
`;

export interface IAppSwitcherProps {
  defaultValue?: boolean;
  onChange: (value: boolean) => void;
}

export const AppSwitcher: React.FC<IAppSwitcherProps> = React.memo(function AppSwitcher({ defaultValue = false, onChange }: IAppSwitcherProps) {
    const [isChecked, setIsChecked] = useState(defaultValue);

    const handleOnChange = (e) => {
      onChange(!isChecked);
      setIsChecked(prev => !prev)
    }

    return (
      <SwitcherLabel>
        <Switcher onChange={handleOnChange} checked={isChecked} type="checkbox" />
        <Slider />
      </SwitcherLabel> 
    );
});
