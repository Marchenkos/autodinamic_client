import { Drawer } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getDeviceSize, isMobileDevice } from '../../utils/check-device-size';
import { getIsShowDrawer, getDrawerContent } from './selectors';
import { TOGGLE_DRAWER } from './actions';
import { StyledIcons } from '../../ui/styled-icon.component';

const CloseButtonWrapper = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
`;

export const AppDrawer: React.FC = React.memo(function AppDrawer() {
    const dispatch = useDispatch();
    const isMobile = isMobileDevice();

    const isShowDrawer = useSelector(getIsShowDrawer);
    const drawerContent = useSelector(getDrawerContent);

	const drawerWidth = useMemo(() => 
		isMobile ? '100%' : '60%'
	, [isMobile])

    const toggleDrawer = useCallback(() => {
        dispatch(TOGGLE_DRAWER({ isShow: false }));
    }, [dispatch]);

    return (
        <Drawer
            PaperProps={{ style: { width: drawerWidth } }}
            anchor="right"
            open={isShowDrawer && !!drawerContent}
            onClose={toggleDrawer}
        >
			<CloseButtonWrapper>
                <StyledIcons className="icon-close" size={30} onClick={toggleDrawer} />
            </CloseButtonWrapper>
           {drawerContent}
        </Drawer>
    );
});
