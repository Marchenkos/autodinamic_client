import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { TextSize, TextColor, BodyText } from '../../../../ui/text';
import { useDispatch, useSelector } from 'react-redux';
import { getIsOrderFetching, getUser, getUserOrders } from '../../selectors';
import { GET_ORDER_BY_EMAIL } from '../../actions';
import { Order } from '../../../../graphql/entities';
import { PageTitleText } from '../profile/profile.screen';
import { OrderItem } from './components/order-item.component';
import { DescriptionBodyText } from '../profile/components/delivery-info.component';
import { LoadingState } from '../../../../ui/loading-state';

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
`;

const OrderCountText = styled(BodyText).attrs({
    size: TextSize.SMALL,
    color: TextColor.MEDIUM,
})`
    margin: -15px 0 10px;
`;

const StyledDescription = styled(DescriptionBodyText)`
    width: 50%;
    font-size: 15px;
    color: #9a9a9a;
    font-weight: 400;

    @media (max-width: 850px) {
        width: 100%;
    }
`;

export const Orders: React.FC = React.memo(function Orders() {
    const orders = useSelector(getUserOrders);
    const isFetching = useSelector(getIsOrderFetching);

    const user = useSelector(getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && !orders) {
            dispatch(GET_ORDER_BY_EMAIL.TRIGGER(user.email));
        }
    }, [user, orders, dispatch]);

    const correctName: string = useMemo(() => {
        if (orders) {
            if (orders.length === 1) {
                return 'заказ';
            } else if (orders.length > 1 && orders.length < 5) {
                return 'заказа';
            } else if (orders.length > 4) {
                return 'заказов';
            }
        }

        return '';
    }, [orders]);

    if (isFetching) {
        return <LoadingState />;
    }

    if (!orders || orders.length < 1) {
        return (
            <Wrapper>
                <PageTitleText>История заказов</PageTitleText>
                <StyledDescription>История заказов пуста</StyledDescription>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <PageTitleText>История заказов</PageTitleText>
            <OrderCountText>{`${orders.length} ${correctName}`}</OrderCountText>

            {orders.map((item: Order, index: number) => (
                <OrderItem key={index} order={item} />
            ))}
        </Wrapper>
    );
});

export default Orders;
