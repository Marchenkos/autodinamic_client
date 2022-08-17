import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { AddressListDetails } from './componens/address-list-details.component';
import { HIDE_FORM_MODAL, SHOW_FORM_MODAL } from '../../../modal/actions';
import { EditDeliveryInfo } from './componens/edit-address-details.component';
import { PageTitleText } from '../profile/profile.screen';
import { getUserAddresses } from '../../selectors';
import { StyledButton } from '../../../../ui/new-styled';
import { EmptyAddressList } from './componens/empty-address-list.component';
import { TOGGLE_DRAWER } from '../../../drawer/actions';

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
	flex-direction: row;

	@media (max-width: 850px) {
		flex-direction: column;
    }
`;

const AddressList: React.FC = React.memo(function AddressList() {
    const userAddressInfo = useSelector(getUserAddresses);
    const dispatch = useDispatch();

    const handleCloseModal = useCallback(() => {
        dispatch(HIDE_FORM_MODAL());
    }, [dispatch]);

    const handleOpenModal = useCallback(() => {
        dispatch(
            TOGGLE_DRAWER({
                children: <EditDeliveryInfo handleCloseModal={handleCloseModal} />,
                isShow: true,
            })
        );
    }, [dispatch, handleCloseModal]);

    if (!userAddressInfo) {
        return <EmptyAddressList addAddress={handleOpenModal} />;
    }

    return (
        <>
            <HeaderWrapper>
                <PageTitleText>Cохраненныe адресa</PageTitleText>
                <StyledButton
                    additionalStyles={{ marginRight: '50px', width: '200px' }}
                    onClick={handleOpenModal}
                    label="Добавить адрес"
                />
            </HeaderWrapper>
            <Wrapper>
                {userAddressInfo.map((address) => (
                    <AddressListDetails address={address} />
                ))}
            </Wrapper>
        </>
    );
});

export default AddressList;
