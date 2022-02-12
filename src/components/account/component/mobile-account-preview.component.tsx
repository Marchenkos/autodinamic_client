import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { StyledIcons } from '../../../ui/styled-icon.component';
import { BodyText, TextColor } from '../../../ui/text';
import { TOGGLE_AUTH_DRAWER } from '../../auth/actions';
import { SHOW_SIMPLE_MODAL } from '../../modal/actions';
import { getUser } from '../selectors';

const PreviewWrapper = styled.button`
    align-items: center;
	border: none;
    position: relative;
    cursor: pointer;
    background: none;
	margin-top: 4px;
`;


const SectionHeader = styled(BodyText).attrs({ color: TextColor.DARK })`
    font-family: 'Manrope';
    font-size: 14px;
`;

export const MobileAccountPreview: React.FC = React.memo(function AccountPreview() {
    const history = useHistory();
    const userData = useSelector(getUser);
    const dispatch = useDispatch();

    const navigateToAccount = useCallback(() => {
        if (userData) {
            history.push('/account');
        } else {
            dispatch(TOGGLE_AUTH_DRAWER({ isShow: true }));
        }
    }, [userData, history]);

    return (
        <PreviewWrapper onClick={navigateToAccount}>
			<StyledIcons noMargins size={27} className="icon-account_circle" />
        </PreviewWrapper>
    );
});
