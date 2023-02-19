import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SET_SORT_SECTION } from '../actions';
import { AppSelectorWithoutLabel } from '../../../ui/app-selector.component';
import { getSelectedSort } from '../selector';
import { SORT_DIRECTION } from '../../../graphql/interfaces';

const sortingConfig = [
  {
      label: 'Сначала новые',
      value: SORT_DIRECTION.NEW,
  },
  {
      label: 'Сначала дорогие',
      value: SORT_DIRECTION.HIGHT_PRICE,
  },
  {
      label: 'Сначала дешевые',
      value: SORT_DIRECTION.LOW_PRICE,
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
