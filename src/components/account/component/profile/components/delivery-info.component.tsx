import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { BodyText, TextColor, TextSize, TextWeight } from '../../../../../ui/text';
import { useHistory } from 'react-router-dom';
import { SET_EDITABLE_ADDRESS } from '../../../actions';
import { getPrimaryAddress } from '../../../selectors';
import { StyledButton } from '../../../../../ui/new-styled';

const Section = styled.div`
    display: flex;
    width: 90%;
    margin: 2px 0;
    justify-content: space-between;
`;

const StyledBodyText = styled(BodyText)<{ isLabel?: boolean }>`
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 10px;
    color: ${(props) => (props.isLabel ? '#716f6f' : '#464646')};

    @media (max-width: 850px) {
        text-align: center;
        margin-top: 15px;
    }
`;

export const DescriptionBodyText = styled(BodyText)`
    width: 40%;
    font-size: 14px;
    color: #9a9a9a;
    font-weight: 400;
    line-height: 1.5;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const HelpDescriptionBodyText = styled(DescriptionBodyText)`
    width: 70%;
    margin-bottom: 20px;

	@media (max-width: 850px) {
		width: 100%;
    }
`;

const SectionsWrapper = styled.div`
	width: 300px;
	min-width: 250px;
	background: #ffffff;
    padding: 10px;
    border-radius: 3px;
    -webkit-box-shadow: 1px 2px 18px -1px rgb(193 190 190 / 42%);
    box-shadow: 1px 2px 18px -1px rgb(193 190 190 / 42%);

	@media (max-width: 850px) {
		margin-top: 20px;
		width: 220px;
		min-width: 220px;
    }
`;

const ProfileWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;

    @media (max-width: 850px) {
        flex-direction: column;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    justify-content: center;
    align-items: center;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

export const DeliveryInfo: React.FC = React.memo(function DeliveryInfo() {
    const primaryAddressData = useSelector(getPrimaryAddress);
    const history = useHistory();

    const navigateToAddressList = useCallback(() => {
        history.push('/account/address-list');
    }, [history]);

    if (!primaryAddressData) {
        return (
            <ProfileWrapper>
                <DescriptionBodyText>
                    Вы можете выбрать адрес из "Книги адресов" и сделать его адресом по умолчанию. Это ускорит процесс
                    оформления заказа. Так же Вы можете изменить этот адрес или заменить другим в любое время.
                </DescriptionBodyText>

                <ButtonWrapper>
                    <StyledBodyText>Адрес по умолчанию еще не выбран</StyledBodyText>
                    <StyledButton
                        additionalStyles={{ width: '50%' }}
                        onClick={navigateToAddressList}
                        label="Выбрать адрес"
                    />
                </ButtonWrapper>
            </ProfileWrapper>
        );
    }

    return (
        <ProfileWrapper>
            <div>
                <HelpDescriptionBodyText>
                    Чтобы изменить адрес по умолчанию, перейдите в "Книгу адресов" и назначте другой адрес.
                </HelpDescriptionBodyText>
                <StyledButton additionalStyles={{ width: '45%' }} onClick={navigateToAddressList} label="Изменить" />
            </div>
            <SectionsWrapper>
                <Section>
                    <StyledBodyText isLabel={true}>Город</StyledBodyText>
                    <StyledBodyText>{primaryAddressData.city}</StyledBodyText>
                </Section>
                <Section>
                    <StyledBodyText isLabel={true}>Адрес</StyledBodyText>
                    <StyledBodyText>{primaryAddressData.address}</StyledBodyText>
                </Section>
                <Section>
                    <StyledBodyText isLabel={true}>Почтовый индекс</StyledBodyText>
                    <StyledBodyText>{primaryAddressData.postcode}</StyledBodyText>
                </Section>
            </SectionsWrapper>
        </ProfileWrapper>
    );
});
