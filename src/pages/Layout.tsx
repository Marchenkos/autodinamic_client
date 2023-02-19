import * as React from 'react';

import '../icomoon/style.css';

import { Header } from '../components/general/header.component';
import { Toast } from '../components/toast/toast.component';
import { AppConfirmModal } from '../components/modal/components/app-confirm-modal.component';
import { CommonFooter } from '../components/general/common-footer.component';
import { FormModal } from '../components/modal/components/form-modal';
import styled from 'styled-components';
import { AppSimpleModal } from '../components/modal/components/app-simple-modal.component';
import { AuthDrawer } from '../components/auth/components/auth-drawer.component';
import { ScrollToTopButton } from '../ui/scroll-to-top-button.component';
import { AppDrawer } from '../components/drawer/drawer.component';
import { MobileHeader } from '../components/general/mobile-header.component';
import { Outlet } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    background: ${(props) => props.theme.colors.background.app};
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
    margin-top: 60px;

    @media (max-width: 500px) {
        padding-top: 60px;
        padding-bottom: 600px;
    }

    @media (max-width: 800px) {
        padding-top: 60px;
        padding-bottom: 600px;
    }
`;

export const Layout: React.FC = React.memo(function Layout() {
    return (
        <Wrapper>
            <Header />
            <MobileHeader />
            <ContentWrapper>
              <Outlet />
            </ContentWrapper>
            <Toast />
            <AppConfirmModal />
            <AppSimpleModal />
            <FormModal />
            <CommonFooter />
            <AppDrawer />
            <ScrollToTopButton />
        </Wrapper>
    );
});
