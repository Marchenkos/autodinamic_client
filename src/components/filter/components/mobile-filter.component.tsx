import React, { useCallback } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER_SECTIONS } from '../actions';
import { getSelectedFilters, getSelectedSort } from '../selector';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import { BodyText } from '../../../ui/text';
import { TOGGLE_DRAWER } from '../../drawer/actions';
import { FilterMobile } from './filter.mobile.component';

const Wrapper = styled.div`
    width: 40%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CircleWrapper = styled.div`
    width: 13px;
    height: 13px;
    font-size: 10px;
    justify-content: center;
    font-family: MONOSPACE;
    align-items: center;
    display: flex;
    color: white;
    background: #60bdbf;
    border-radius: 50%;
`;

const SortText = styled(BodyText)`
    font-size: 10px;
    color: #3a3a3a;
    margin: 0 5px;
`;

export const MobileFilter: React.FC = React.memo(function MobileFilter() {
    const dispatch = useDispatch();
    const selectedFilters = useSelector(getSelectedFilters);

    const handleCleanFilter = useCallback(() => {
        dispatch(SET_FILTER_SECTIONS(undefined));
        dispatch(
            TOGGLE_DRAWER({
                isShow: false,
            })
        );
    }, [dispatch]);

    const handleOpenFilter = useCallback(() => {
        dispatch(
            TOGGLE_DRAWER({
                isShow: true,
                children: <FilterMobile cleanFilter={handleCleanFilter} />,
            })
        );
    }, [dispatch]);

    return (
        <Wrapper onClick={handleOpenFilter}>
            <LinearScaleIcon style={{ fontSize: '16px' }} />
            <SortText>Фильтр</SortText>
            {selectedFilters && <CircleWrapper>{selectedFilters.length}</CircleWrapper>}
        </Wrapper>
    );
});
