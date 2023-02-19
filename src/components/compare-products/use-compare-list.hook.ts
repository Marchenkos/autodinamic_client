import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCompareItemsIds, getCompareItemsCount, getCompareData, getCompareIsFetching } from './selectors';

export interface CompareListData {
    data: any | undefined;
    count: number;
    isFetching: boolean;
    refresh: () => void;
}

export const useCompareListData = (): CompareListData => {
    const ids = useSelector(getCompareItemsIds);
    const count = useSelector(getCompareItemsCount);
    const data = useSelector(getCompareData);
    const isFetching = useSelector(getCompareIsFetching);

    const dispatch = useDispatch();

    const refresh = useCallback(() => {
        if (count > 0) {
            // dispatch(FETCH_COMPARE_LIST.TRIGGER(ids));
        }
    }, [dispatch, ids]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        data,
        count,
        refresh,
        isFetching,
    };
};
