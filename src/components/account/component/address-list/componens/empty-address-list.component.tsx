import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { StyledButton } from '../../../../../ui/new-styled';
import { BodyText } from '../../../../../ui/text';
import { PageTitleText } from '../../profile/profile.screen';

const StyledDescription = styled(BodyText)`
    font-size: 15px;
    color: #9a9a9a;
    font-weight: 400;
    margin-bottom: 50px;
`;

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

interface EmptyAddressListProps {
    addAddress: () => void;
}

export const EmptyAddressList: React.FC<EmptyAddressListProps> = React.memo(function EmptyAddressList({
    addAddress,
}: EmptyAddressListProps) {
    return (
        <Wrapper>
            <PageTitleText>Cохраненныe адресa</PageTitleText>

            <StyledDescription>
                На данный момент у Вас нет сохраненных адресов. Вы можете добавить свой адрес, чтобы использовать его
                при оформлении заказа. Также Вы можете сохранить несколько адресов и выбрвть один, который будет
                "Адресом по умолчанию", после чего именно этот адрес будет использоваться в качестве адреса доставки
                заказа.
            </StyledDescription>

            <StyledButton additionalStyles={{ width: '300px' }} onClick={addAddress} label="Добавить адрес" />
        </Wrapper>
    );
});
