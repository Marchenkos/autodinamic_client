import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

import { DELIVERY_METHODS } from '../../graphql/entities';
import { BodyText, TextColor, TextSize, TextWeight, TitleText } from '../../ui/text';
import { getSteps, OrderStepper } from '../../components/account/component/orders/components/order-stepper.component';
import { ProductCarousel } from '../Home.page';
import { CarouselItem } from '../../components/product-details/components/carousel-item.component';
import { getIsOrderFetching, getOrderDetails } from '../../components/account/selectors';
import { GET_ORDER_BY_ID } from '../../components/checkout/order-confirmation/actions';
import { LoadingState } from '../../ui/loading-state';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
`;

const MoreDetails = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 30px 0 50px;
`;

const StatusWrapper = styled.div`
    flex-grow: 1;
`;

const MoreDetailsDescription = styled.div`
    margin-bottom: 50px;
`;

const MoreDetailsStatus = styled.div`
    width: 50%;
`;

const NameText = styled(TitleText).attrs({ size: TextSize.LARGE, color: TextColor.DARK })``;

const PriceText = styled(TitleText).attrs({ size: TextSize.LARGE, color: TextColor.BLUE })`
    margin-right: 50px;
`;

const OrderNumText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.MEDIUM })`
    margin-bottom: 15px;
`;

const ValueText = styled(BodyText).attrs({ size: TextSize.SMALL, color: TextColor.DARK })`
    margin-bottom: 0px;
    margin-right: 10px;
`;

const BreadcrumbsWrapper = styled.div`
    margin-bottom: 30px;
`;

const HeaderWrapper = styled.div`
    display: flex;
`;

const LabelText = styled(BodyText).attrs({ color: TextColor.DARK, size: TextSize.SMALL, weight: TextWeight.MEDIUM })``;

const LabelGrayText = styled(BodyText).attrs({ size: TextSize.EXTRA_SMALL, weight: TextWeight.MEDIUM })`
    margin-right: 10px;
    color: #3e6969;
`;

const SingleOrderPage: React.FC = React.memo(function SingleOrderPage() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
      if (id) {
        dispatch(GET_ORDER_BY_ID.TRIGGER(id));
      }
    }, [dispatch, id]);

    const orderDetails = useSelector(getOrderDetails);
    const isFetching = useSelector(getIsOrderFetching);
    const steps = getSteps();

    const deliveryTypeName = useMemo(
        () => (orderDetails && orderDetails.deliveryType === DELIVERY_METHODS.POST ? 'Почтой' : 'Самовывоз'),
        [orderDetails]
    );

    if (isFetching) {
        return <LoadingState />;
    }

    if (!orderDetails) {
        return <div>null</div>;
    }

    return (
        <>
            <BreadcrumbsWrapper>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/account/orders">
                        Мои заказы
                    </Link>
                    <Typography>{`Заказ № ${orderDetails.orderId}`}</Typography>
                </Breadcrumbs>
            </BreadcrumbsWrapper>
            <HeaderWrapper>
                <StatusWrapper>
                    <NameText>{steps[orderDetails.stepDate.length]}</NameText>
                    <OrderNumText>{`Номер заказа: ${orderDetails.orderId}`}</OrderNumText>
                </StatusWrapper>
                <PriceText>{`${orderDetails.total} BYN`}</PriceText>
            </HeaderWrapper>
            <MoreDetails>
                <MoreDetailsStatus>
                    <NameText>История заказа</NameText>
                    <OrderStepper
                        currentStep={orderDetails.currentStep}
                        currentStepDate={orderDetails.stepDate[orderDetails.stepDate.length - 1]}
                    />
                </MoreDetailsStatus>
                <div>
                    <MoreDetailsDescription>
                        <NameText>Способ доставки</NameText>
                        <Wrapper>
                            <LabelGrayText>Тип доставки:</LabelGrayText>
                            <LabelText>{deliveryTypeName}</LabelText>
                        </Wrapper>
                        <Wrapper>
                            <LabelGrayText>Адрес доставки:</LabelGrayText>
                            <LabelText>{`г.${orderDetails.address.city} ${orderDetails.address.address}`}</LabelText>
                        </Wrapper>
                        <Wrapper>
                            <LabelGrayText>Стоимость доставки:</LabelGrayText>
                            <LabelText>{`${orderDetails.deliveryCost} BYN`}</LabelText>
                        </Wrapper>
                    </MoreDetailsDescription>
                    <MoreDetailsDescription>
                        <NameText>Личная информация</NameText>
                        <Wrapper>
                            <LabelGrayText>Имя, фамилия:</LabelGrayText>
                            <LabelText>{`${orderDetails.userDetails.firstName} ${orderDetails.userDetails.lastName}`}</LabelText>
                        </Wrapper>
                        <Wrapper>
                            <LabelGrayText>Номер телефона:</LabelGrayText>
                            <LabelText>{orderDetails.userDetails.phoneNumber}</LabelText>
                        </Wrapper>
                        <Wrapper>
                            <LabelGrayText>Электронная почта:</LabelGrayText>
                            <LabelText>{orderDetails.userEmail}</LabelText>
                        </Wrapper>
                    </MoreDetailsDescription>
                </div>
            </MoreDetails>
            <ProductCarousel>
                {orderDetails.productItems.map((item) => (
                    <CarouselItem smallVersion={true} key={item.id} product={item} />
                ))}
            </ProductCarousel>
        </>
    );
});

export default SingleOrderPage;
