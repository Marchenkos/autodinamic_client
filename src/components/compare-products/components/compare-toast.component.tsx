import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Chip } from '@material-ui/core';
import CompareIcon from '@material-ui/icons/Compare';

import { useNavigate } from 'react-router-dom';
import { getCompareItemsCount, getIsShowCompareItemsCount } from '../selectors';
import { HIDE_COMPARE_TOAST } from '../actions';

const ChipWrapper = styled.div`
    position: fixed;
    bottom: -20px;
    right: 50px;
`;

const StyledChip = styled(Chip)`
    height: 80px;
    align-items: start;
    padding-top: 20px;
    cursor: pointer;
`;

export const CompareToast: React.FC = React.memo(function CompareToast() {
    const dispatch = useDispatch();
    const compareItemsCount = useSelector(getCompareItemsCount);
    const isShow = useSelector(getIsShowCompareItemsCount);

    let history = useNavigate();

    const navigateToCompare = useCallback(() => {
        history('/compare');
    }, [history]);

    const hideToast = useCallback(() => {
        dispatch(HIDE_COMPARE_TOAST());
    }, [dispatch]);

    if (!isShow) {
        return null;
    }

    return (
        <ChipWrapper onClick={navigateToCompare}>
            <Chip
                style={{
                    height: '80px',
                    alignItems: 'start',
                    paddingTop: '20px',
                    cursor: 'pointer',
                }}
                label={`${compareItemsCount} товара в сравнение`}
                color="primary"
                onDelete={hideToast}
                icon={<CompareIcon />}
            />
        </ChipWrapper>
    );
});
