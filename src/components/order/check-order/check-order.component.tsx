import { InputBase, makeStyles } from '@material-ui/core';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CustomInput } from '../../../ui/app-input.component';
import { LoadingState } from '../../../ui/loading-state';
import { StyledButton } from '../../../ui/new-styled';
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
    padding: 40px 100px;

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
    width: 80%;
    justify-content: center;
    margin: 20px auto 0;

    @media (max-width: 850px) {
        width: 100%;
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

const InputWrapper = styled.div`
    margin: 10px 0;
    width: 30%;

    @media (max-width: 850px) {
        width: 95%;
    }
}`;

const CheckOrderText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.SMALL })`
    @media (max-width: 850px) {
        font-size: 14px;
    }
`;

const QuestionText = styled(BodyText).attrs({
    color: TextColor.BLUE,
    size: TextSize.MEDIUM,
    weight: TextWeight.MEDIUM,
})`
    margin-bottom: 10px;
`;

const CheckOrderTitle = styled(BodyText).attrs({ color: TextColor.MEDIUM, size: TextSize.MEDIUM })`
    margin: 20px auto;

    @media (max-width: 850px) {
        margin: 0px;
        font-size: 16px;
    }
`;

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        color: 'inherit',
        width: '95%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: '1em',
        transition: theme.transitions.create('width'),
        border: '2px solid #48b3b3',
        width: '100%',
        color: '#797979',
        '&:focus': {
            color: '#292929',
        },
    },
}));

const PageTitleText = styled(TitleText)`
    font-size: 25px;
    margin-bottom: 20px;

    @media (max-width: 850px) {
        font-size: 20px;
    }
`;

export const CheckOrder: React.FC = React.memo(function CheckOrder() {
    const [orderId, setOrderId] = useState('');
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoadingOrder);
    const orderById = useSelector(getOrder);
    const isMobile = getDeviceSize();

    let buttonSize = '15%';

    if (isMobile < 850) {
        buttonSize = '30%';
    }

    const getOrderStatus = useCallback(() => {
        console.log(orderId);
        dispatch(GET_ORDER_BY_ID.TRIGGER(orderId));
    }, [orderId, dispatch]);

    return (
        <DeliveryInfoWrapper>
            <PageTitleText>Проверка статуса заказа</PageTitleText>
            <CheckOrderText>Введите номер заказа, чтобы узнать его статус</CheckOrderText>
            <OrderInfoWrapper>
                <InputWrapper>
                    <InputBase
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        autoFocus={true}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        placeholder="Номер заказа"
                    />
                </InputWrapper>
                <StyledButton additionalStyles={{ width: buttonSize }} onClick={getOrderStatus} label="Проверить" />
            </OrderInfoWrapper>
            {orderById && <OrderInfo order={orderById} />}
            <QuestionWrapper>
                <CheckOrderTitle>Часто задаваемые вопросы</CheckOrderTitle>

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
