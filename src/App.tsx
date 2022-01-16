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

const Wrapper = styled.div`
    width: 100%;
    background: white;
    min-height: 100vh;
    position: relative;
`;

const ContentWrapper = styled.div`
    padding-bottom: 300px;
    min-height: 90vh;
`;

export const App: React.FC = React.memo(function App() {
    return (
        <Wrapper>
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
        </Wrapper>
    );
});
