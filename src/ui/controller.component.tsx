import React, { useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useDispatch, useSelector } from 'react-redux';
import { IFilter } from '../graphql/interfaces';
import { BodyText, TextSize, TextWeight } from './text';
import { getSelectedFilters } from '../components/filter/selector';
import { UPDATE_FILTERS } from '../components/filter/actions';

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
