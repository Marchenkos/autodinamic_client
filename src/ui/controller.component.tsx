import React, { useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useDispatch, useSelector } from 'react-redux';
import { toggleOnlyOne } from '../components/filter/helpers/update-filters-sections';
import { SET_FILTER_SECTIONS } from '../components/filter/actions';
import styled from 'styled-components';
import { FilterObject } from '../graphql/interfaces';
import { BodyText, TextSize, TextWeight } from './text';
import { getSelectedFilters } from '../components/filter/selector';

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

interface AppSwitchProps {
    isChecked: boolean;
    handleChange: () => void;
}

const Wrapper = styled.div`
    display: flex;
`;

const DescriptionText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL })<{ isSelected?: boolean }>`
    margin-right: 15px;
    display: flex;
    align-items: center;
    padding-bottom: 7px;
    color: ${(props) => (props.isSelected ? '#4f9898' : 'black')};
`;

export const AppSwitch: React.FC<AppSwitchProps> = React.memo(function AppSwitch({
    handleChange,
    isChecked,
}: AppSwitchProps) {
    return (
        <FormGroup>
            <FormControlLabel control={<BlueSwitch checked={isChecked} onChange={handleChange} />} label="" />
        </FormGroup>
    );
});

interface FilterSwitchProps {
    filter: FilterObject;
}

export const FilterSwitch: React.FC<FilterSwitchProps> = React.memo(function FilterSwitch({
    filter,
}: FilterSwitchProps) {
    const selectedFilters = useSelector(getSelectedFilters);
    const [isSelected, setIsSelected] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (!selectedFilters) {
            setIsSelected(false);
        } else {
            selectedFilters.map((selectedFilter) => {
                if (selectedFilter.name === filter.field_name) {
                    setIsSelected(true);
                }
            });
        }
    }, [selectedFilters, filter]);

    const handleOnChange = useCallback(
        (e: any, value: boolean) => {
            setIsSelected(value);
            const sfilters = selectedFilters || [];
            let updatedSelectedFilters = toggleOnlyOne(sfilters, value, filter.field_name, 'only-one');

            dispatch(SET_FILTER_SECTIONS(updatedSelectedFilters));
        },
        [dispatch, selectedFilters, filter]
    );

    return (
        <FormGroup>
            <Wrapper>
                <DescriptionText isSelected={!isSelected}>Нет</DescriptionText>
                <FormControlLabel control={<BlueSwitch checked={isSelected} onChange={handleOnChange} />} label="" />
                <DescriptionText isSelected={isSelected}>Да</DescriptionText>
            </Wrapper>
        </FormGroup>
    );
});
