import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { SET_SORT_SECTION } from '../actions';
import { AppSelectorWithoutLabel } from '../../../ui/app-selector.component';
import { getSelectedSort } from '../selector';
import FilterListIcon from '@material-ui/icons/FilterList';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { BodyText } from '../../../ui/text';

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

export const MobileFilter: React.FC = React.memo(function MobileFilter() {
    const dispatch = useDispatch();
    const selectedSort = useSelector(getSelectedSort);
	const sortName = useMemo(() => {
		const value = sortingConfig.find((item) => item.value === selectedSort);

		if (!value) {
			return 'Сортировка';
		}

		return value.label;
	}, [selectedSort]);

    const handleSetSort = useCallback(
        (event: any) => {
            const chosenCategory = sortingConfig.find((item) => item.value === event.target.value);

            if (chosenCategory) {
                dispatch(SET_SORT_SECTION(chosenCategory.value));
            }
        },
        [dispatch, selectedSort]
    );

	return (
		<Wrapper>
			<LinearScaleIcon style={{ fontSize: '16px'}} />
			<SortText>Фильтр</SortText>
			<CircleWrapper>1</CircleWrapper>
		</Wrapper>
	 );
});
