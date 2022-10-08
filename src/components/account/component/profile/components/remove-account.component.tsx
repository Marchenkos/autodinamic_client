import React, { useCallback } from 'react';
import styled from 'styled-components';

import { StyledButton } from '../../../../../ui/new-styled';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../selectors';
import { REMOVE_ACCOUNT } from '../../../actions';
import { BodyText, BodyTextSpan } from '../../../../../ui/text';
import { SHOW_CONFIRM_MODAL } from '../../../../modal/actions';

const DescriptionBodyText = styled(BodyText)`
    font-size: 14px;
    color: #9a9a9a;
    font-weight: 400;
    line-height: 1.5;

    @media (max-width: 850px) {
        width: 100%;
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

const WarningText = styled(BodyTextSpan)`
    color: #df7d7d;
    font-weight: 400;
    line-height: 1.5;
    font-size: 14px;
    text-decoration: underline;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    justify-content: center;
    align-items: center;

    @media (max-width: 850px) {
        width: 100%;
        margin-top: 15px;
    }
`;

export const RemoveAccount: React.FC = React.memo(function RemoveAccount() {
    const currentUser = useSelector(getUser);
    const dispatch = useDispatch();

    const handleRemoveAccount = useCallback(
        (choice: boolean) => {
            if (choice && currentUser) {
                dispatch(REMOVE_ACCOUNT.TRIGGER(currentUser.email));
            }
        },
        [dispatch, currentUser]
    );

    const handleOnRemove = useCallback(() => {
        dispatch(
            SHOW_CONFIRM_MODAL({
                title: 'Вы уверены, что хотите удалить свой аккаунт?',
                description: 'после соглашения, вся личная информация будет удалена безвозвратно',
                onChoose: handleRemoveAccount,
            })
        );
    }, [dispatch]);

    return (
        <ProfileWrapper>
            <div>
                <DescriptionBodyText>
                    При удалении аккаунта, <WarningText>вся сохраненная информация будет потеряна.</WarningText>
                </DescriptionBodyText>
                <DescriptionBodyText>
                    Если у Вас есть текущие заказы, которые находятся в обработке, либо уже доставляются, то эти{' '}
                    <WarningText>ЗАКАЗЫ НЕ БУДУТ ОТМЕНЕНЫ</WarningText>. Чтобы отменить заказы, перейдите в "Мои заказы"
                    и воспользуйтесь отменой, либо свяжитесь с продавцом.
                </DescriptionBodyText>
            </div>

            <ButtonWrapper>
                <StyledButton
                    additionalStyles={{ width: '50%', background: '#c37d7d', borderColor: '#c37d7d' }}
                    onClick={handleOnRemove}
                    label="Удалить аккаунт"
                />
            </ButtonWrapper>
        </ProfileWrapper>
    );
});
