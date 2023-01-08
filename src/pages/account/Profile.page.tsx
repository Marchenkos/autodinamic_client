import React from 'react';
import styled from 'styled-components';

import { TitleText } from '../../ui/text';
import { DeliveryInfo } from '../../components/account/component/profile/components/delivery-info.component';
import { AccountPersonalDetails } from '../../components/account/component/profile/components/personal-details.component';
import { RemoveAccount } from '../../components/account/component/profile/components/remove-account.component';

const Section = styled.div<{ needGap?: boolean }>`
    width: 100%;
    margin-bottom: 20px;

    margin-top: ${(props) => props.needGap && '50px'};
`;

export const PageTitleText = styled(TitleText)`
    font-size: 22px;
    margin-bottom: 25px;
`;

const NameText = styled(TitleText)`
    font-size: 16px;
    margin-bottom: 10px;
`;

const Divider = styled.div`
    width: 100%;
    border-top: 1px solid #e0e0e0;
    margin: 10px 0;
`;

const ProfilePage: React.FC = React.memo(function ProfilePage() {
    return (
        <>
            <PageTitleText>Личная информация</PageTitleText>
            <Section>
                <NameText>Персональные данные</NameText>
                <Divider />
                <AccountPersonalDetails />
            </Section>
            <Section>
                <NameText>Данные для доставки</NameText>
                <Divider />
                <DeliveryInfo />
            </Section>
            <Section needGap={true}>
                <NameText>Удалить аккаунт</NameText>
                <Divider />
                <RemoveAccount />
            </Section>
        </>
    );
});

export default ProfilePage;
