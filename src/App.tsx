import * as React from 'react';

import './icomoon/style.css';

import { CommonHeader } from './components/general/common-header.component';
import RenderRoutes from './router/routes-config';
import { routes } from './router/config';
import { Toast } from './components/toast/toast.component';
import { useLocation } from 'react-router-dom';
import { AppConfirmModal } from './components/modal/components/app-confirm-modal.component';
import { CommonFooter } from './components/general/common-footer.component';
import { FormModal } from './components/modal/components/form-modal';
import { useMemo } from 'react';
import { getDeviceSize } from './utils/check-device-size';
import styled from 'styled-components';
import { AppSimpleModal } from './components/modal/components/app-simple-modal.component';
import { AuthDrawer } from './components/auth/components/auth-drawer.component';
import ScrollToTop from './ScrollToTop';
import { ScrollToTopButton } from './ui/scroll-to-top-button.component';

const Wrapper = styled.div`
    width: 100%;
    background: white;
    min-height: 100vh;
    position: relative;

	min-width: 320px;
	max-width: 1700px;
`;

const ContentWrapper = styled.div`
    padding-bottom: 400px;
    min-height: 90vh;
	padding-top: 0px;
    box-sizing: border-box;

	@media (max-width: 500px) {
		padding-top: 60px;
		padding-bottom: 600px;
    }

	@media (max-width: 800px) {
		padding-top: 60px;
		padding-bottom: 600px;
    }
`;

export const App: React.FC = React.memo(function App() {
    return (
        <Wrapper>
            <ScrollToTop />
            <CommonHeader />
            <ContentWrapper>
                <RenderRoutes routes={routes} />
            </ContentWrapper>
            <Toast />
            <AppConfirmModal />
            <AppSimpleModal />
            <FormModal />
            <CommonFooter />
            <AuthDrawer />
			<ScrollToTopButton />
        </Wrapper>
    );
});
