import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IFilter } from "../../../graphql/interfaces";
import { BodyText, TextColor, TextSize, TextWeight } from "../../../ui/text";
import { REMOVE_FILTER, UPDATE_FILTERS } from "../actions";
import { getSelectedFilters } from "../selector";
import styled from 'styled-components';
import { AppSwitcher } from "../../../ui/app-switcher.ui";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 10px;
`;

const SectionTitle = styled(BodyText).attrs({
  size: TextSize.EXTRA_SMALL,
  weight: TextWeight.MEDIUM,
  color: TextColor.DARK,
})`
`;

const BlueSwitch = withStyles({
  switchBase: {
      color: '#C4DFDE',
      '&$checked': {
          color: '#70D5CF',
      },
      '&$checked + $track': {
          backgroundColor: '#9BE6E1',
      },
  },
  checked: {},
  track: {},
})(Switch);


interface FilterSwitchProps {
  filter: IFilter;
}

export const FilterSwitch: React.FC<FilterSwitchProps> = React.memo(function FilterSwitch({
  filter,
}: FilterSwitchProps) {
  const selectedFilters = useSelector(getSelectedFilters);
  const [isSelected, setIsSelected] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const isExist = selectedFilters.find(f => f.id === filter.id);
    console.log("ONGANGE 222- ", selectedFilters)

    if (isExist && isExist.values.single && isExist.values.single !== isSelected) {
      setIsSelected(isExist.values.single)
    }
  }, [selectedFilters, filter, isSelected]);

  const handleOnChange2 = useCallback((value) => {
    setIsSelected(value);

    if (value) {
      dispatch(UPDATE_FILTERS({ ...filter, values: { single: value }}));

    } else {
      dispatch(REMOVE_FILTER(filter));
    }


  }, [filter, dispatch]);

  const handleOnChange = useCallback(
      (e: any, value: boolean) => {

        setIsSelected(prev => !prev);

        if (value) {
          dispatch(UPDATE_FILTERS({ ...filter, values: { single: value }}));

        } else {
          dispatch(REMOVE_FILTER(filter));
        }

      },
      [dispatch, filter]
  );

  return (
      <FormGroup>
          <Wrapper>
            <SectionTitle>{filter.displayName}</SectionTitle>
            {/* <AppSwitcher defaultValue={isSelected} onChange={handleOnChange2} /> */}
            <FormControlLabel control={<BlueSwitch checked={isSelected} onChange={handleOnChange} />} label="" />
          </Wrapper>
      </FormGroup>
  );
});
