import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SET_SORT_SECTION } from '../actions';
import { AppSelectorWithoutLabel } from '../../../ui/app-selector.component';
import { getSelectedSort } from '../selector';

//TODO move to firebase??
const sortingConfig = [
    {
        label: 'Сначала новые',
        value: 'new',
    },
    {
        label: 'Сначала дорогие',
        value: 'max_price',
    },
    {
        label: 'Сначала дешевые',
        value: 'min_price',
    },
];

export const Sorting: React.FC = React.memo(function Sort() {
    const dispatch = useDispatch();
    const selectedSort = useSelector(getSelectedSort);

    const handleSetSort = useCallback(
        (event: any) => {
            const chosenCategory = sortingConfig.find((item) => item.value === event.target.value);

            if (chosenCategory) {
                dispatch(SET_SORT_SECTION(chosenCategory.value));
            }
        },
        [dispatch, selectedSort]
    );

    return <AppSelectorWithoutLabel param={sortingConfig} onChange={handleSetSort} value={selectedSort} />;
});
