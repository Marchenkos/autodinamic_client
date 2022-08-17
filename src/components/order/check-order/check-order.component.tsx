import { InputBase, makeStyles } from '@material-ui/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CustomInput } from '../../../ui/app-input.component';
import { LoadingState } from '../../../ui/loading-state';
import { StyledButton, TextInput } from '../../../ui/new-styled';
import { BodyText, TextColor, TextSize, TitleText, TextWeight } from '../../../ui/text';
import { getDeviceSize } from '../../../utils/check-device-size';
import { GET_ORDER_BY_ID } from '../../checkout/order-confirmation/actions';
import { getIsLoadingOrder, getOrder } from '../../checkout/order-confirmation/selectors';
import { OrderInfo } from './order-info';

const DeliveryInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    padding: 40px 50px;
	box-sizing: border-box;

    @media (max-width: 850px) {
        padding: 40px 25px;
    }
`;

const QuestionSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 50%;
    margin: 20px auto;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

const OrderInfoWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
	width: 70%;
    margin: 0 auto;

    @media (max-width: 850px) {
        width: 100%;

		flex-direction: column;
    	align-items: center;
    }
`;

const QuestionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 100px;

    @media (max-width: 850px) {
        margin-top: 30px;
    }
`;

const Separator = styled.div`
    margin: 20px auto 25px;
    font-size: 25px;
    color: #1aa0a2;

    @media (max-width: 850px) {
        margin: 10px auto 10px;
    }
}`;

const CheckOrderText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.SMALL })`
	margin: 20px auto 0;

	@media (max-width: 850px) {
		font-size: 14px;
		line-height: 20px;
		margin-top: 0px;
    }
`;

const QuestionText = styled(BodyText).attrs({
    color: TextColor.BLUE,
    size: TextSize.MEDIUM,
    weight: TextWeight.MEDIUM,
})`
    margin-bottom: 10px;

	@media (max-width: 850px) {
		font-size: 14px;
    }
`;

const PageTitleText = styled(TitleText)`
    font-size: 25px;
    margin-bottom: 20px;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

const PageSubTitleText = styled(TitleText)`
    font-size: 20px;
    margin-bottom: 20px;

    @media (max-width: 850px) {
		font-size: 18px;
		margin-top: 10px;
		text-align: center;
    }
`;

const StyledInput = styled.input`
    height: 40px;
    padding-left: 7px;
    outline: none;
    font-size: 15px;
    font-family: 'Manrope';
	border: none;
	border-bottom: 1px solid #d6d6d6;
    width: 70%;

    &:focus {
		border-bottom: 1.5px solid #86b7b7;
    }

	&::placeholder {
		color: #d6d6d6;
	}

	@media (max-width: 850px) {
        width: 100%;
		font-size: 12px;
		margin-bottom: 15px;
    }
`;

const StyledLabel = styled(BodyText)`
	margin: 50px auto 0;
	color: #808080;
    font-size: 12px;
	width: 70%;

	@media (max-width: 850px) {
		font-size: 11px;
		margin: 10px 0;
		width: 100%;
    }
`;

export const CheckOrder: React.FC = React.memo(function CheckOrder() {
    const [orderId, setOrderId] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoadingOrder);
    const orderById = useSelector(getOrder);

    const getOrderStatus = useCallback(() => {
        dispatch(GET_ORDER_BY_ID.TRIGGER(orderId));
    }, [orderId, dispatch]);

    return (
        <DeliveryInfoWrapper>
            <PageTitleText>Проверка статуса заказа</PageTitleText>
            <StyledLabel>Введите номер заказа, чтобы узнать его статус</StyledLabel>
            <OrderInfoWrapper>
				<StyledInput
					value={orderId}
					onChange={(e) => setOrderId(e.target.value)}
					autoFocus={true}
					placeholder="Номер заказа"
				/>
                <StyledButton additionalStyles={{ width: '200px' }} onClick={getOrderStatus} label="Проверить" />
            </OrderInfoWrapper>
            {orderById && <OrderInfo order={orderById} />}
            <QuestionWrapper>
                <PageSubTitleText>Часто задаваемые вопросы</PageSubTitleText>

                <QuestionSection>
                    <QuestionText>{`>>> Где находится код заказа?`}</QuestionText>
                    <CheckOrderText>
                        После оформления заказа, на странице появляется сообщение, что он принят и обрабатывается. Также
                        на странице указан номер заказа. Если во время оформления заказа была выбрана функция оповещения
                        при подтверждении, то номер заказа также будет продублирован в SMS.
                    </CheckOrderText>
                </QuestionSection>
                <Separator>***</Separator>
                <QuestionSection>
                    <QuestionText>{`>>> Могу ли я узнать статус заказа в личной кабинете?`}</QuestionText>
                    <CheckOrderText>
                        Да, после входа в свой аккаунт, можно просмотреть историю заказов, где хранятся завершенные, а
                        также активные заказы. Однако, если заказ был оформлен до регистрации то информация о нем не
                        будет отображаться на странице аккаунта!
                    </CheckOrderText>
                </QuestionSection>
                <Separator>***</Separator>
                <QuestionSection>
                    <QuestionText>{`>>> Что делать, если забыл код заказа?`}</QuestionText>
                    <CheckOrderText>
                        При утере информации о заказе, необходимо воспользоваться контактной информацией продавца.
                    </CheckOrderText>{' '}
                </QuestionSection>
            </QuestionWrapper>
            {isLoading && <LoadingState />}
        </DeliveryInfoWrapper>
    );
});
