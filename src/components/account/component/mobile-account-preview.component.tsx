import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { StyledIcons } from '../../../ui/styled-icon.component';
import { BodyText, TextColor } from '../../../ui/text';
import { AuthDrawer } from '../../auth/components/auth-drawer.component';
import { TOGGLE_DRAWER } from '../../drawer/actions';
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
    const history = useNavigate();
    const userData = useSelector(getUser);
    const dispatch = useDispatch();

    const navigateToAccount = useCallback(() => {
        if (userData) {
            history('/account');
        } else {
            dispatch(
                TOGGLE_DRAWER({
                    isShow: true,
                    children: <AuthDrawer />,
                })
            );
        }
    }, [userData, history]);

    return (
        <PreviewWrapper onClick={navigateToAccount}>
            <StyledIcons noMargins size={27} className="icon-account_circle" />
        </PreviewWrapper>
    );
});
