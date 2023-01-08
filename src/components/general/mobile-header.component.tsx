import React from 'react';
import styled from 'styled-components';

import { MobileMenuHeader } from './menu/mobile-menu-header.component';
import { MobileMenuFooter } from './menu/mobile-menu-footer.component';

const MobileMenuWrapper = styled.div`
    display: none;

    @media (max-width: 800px) {
        display: block;
    }
`;

export const MobileHeader: React.FC = React.memo(function MobileHeader() {
    return (
        <MobileMenuWrapper>
            <MobileMenuHeader />
            <MobileMenuFooter />
        </MobileMenuWrapper>
    );
});
