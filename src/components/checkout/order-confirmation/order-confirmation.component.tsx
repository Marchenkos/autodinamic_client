import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel } from '@material-ui/core';

import { TitleText } from '../../../ui/text';
import { OrderUserInfo } from './components/user-info.component';
import { OrderDeliveryInfo } from './components/delivery-info';
import { ConfirmOrder } from './components/confirm-order.component';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAddedOrder, getOrderUserDetails } from './selectors';
import { CompleteOrder } from './components/complete-order.component';

import { getDeviceSize } from '../../../utils/check-device-size';
import { SHOW_CONFIRM_MODAL } from '../../modal/actions';
import { OrderPaymentInfo } from './components/payment-type-info';
import { StyledButton } from '../../../ui/new-styled';

const OrderConfirmationWrapper = styled.div`
    padding: 40px 50px;

    @media (max-width: 850px) {
        padding: 20px 25px;
    }
`;

const OrderConfirmationHeader = styled.div`
    display: flex;
    justify-content: space-between;

    @media (max-width: 850px) {
        flex-direction: column;
    }
`;

const StyledTitleText = styled(TitleText)`
    @media (max-width: 850px) {
        margin-bottom: 20px;
    }
`;

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    step: {
        '&$completed': {
            color: '#60BDBF',
        },
        '&$active': {
            color: '#60BDBF',
        },
    },
    active: {}, //needed so that the &$active tag works
    completed: {},
    disabled: {},
}));

export interface OptionalDetailsData {
    addressLine: string;
    city: string;
    postcode: string;
}

export const OrderConfirmation: React.FC = React.memo(function OrderConfirmation() {
    const [activeStep, setActiveStep] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const history = useHistory();
    const order = useSelector(getAddedOrder);
    const deviceSize = getDeviceSize();
    const dispatch = useDispatch();
    const classes = useStyles();

    const steps = ['Личная информация', 'Способ доставки', 'Способ оплаты', 'Подтверждение заказа'];

    const handleEditInfo = useCallback(
        (index: number) => {
            setActiveStep(index);
            setIsEditing(true);
        },
        [isEditing]
    );

    const handleNextStep = useCallback(() => {
        if (isEditing) {
            setActiveStep(3);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    }, [isEditing]);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleConfirmModal = useCallback(
        (choice: boolean) => {
            if (choice) {
                history.goBack();
            }
        },
        [history]
    );

    const handleOnBackToBasket = useCallback(() => {
        dispatch(
            SHOW_CONFIRM_MODAL({
                title: 'Вы уверены, что хотите вернуться к корзине?',
                onChoose: handleConfirmModal,
            })
        );
    }, [dispatch]);

    const getStepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return <OrderUserInfo handleNextStep={handleNextStep} />;
            case 1:
                return <OrderDeliveryInfo handleNextStep={handleNextStep} handleBack={handleBack} />;
            case 2:
                return <OrderPaymentInfo handleNextStep={handleNextStep} handleBack={handleBack} />;
            case 3:
                return (
                    <ConfirmOrder
                        editUserInfo={() => handleEditInfo(0)}
                        editDeliveryInfo={() => handleEditInfo(1)}
                        editPaymentInfo={() => handleEditInfo(2)}
                    />
                );
            default:
                return 'Unknown step';
        }
    }, [activeStep, isEditing]);

    if (order) {
        return <CompleteOrder order={order} />;
    }

    return (
        <OrderConfirmationWrapper id="order-confirmation">
            <OrderConfirmationHeader>
                <StyledTitleText>Оформление заказа</StyledTitleText>
                <StyledButton
                    additionalStyles={{ width: '250px' }}
                    isSecondary
                    onClick={handleOnBackToBasket}
                    label="Вернуться к корзине"
                />
            </OrderConfirmationHeader>
            <div className={classes.root}>
                <Stepper
                    style={{ marginTop: '30px', display: deviceSize > 850 ? 'flex' : 'none' }}
                    activeStep={activeStep}
                >
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                key={index}
                                StepIconProps={{
                                    classes: {
                                        root: classes.step,
                                        completed: classes.completed,
                                        active: classes.active,
                                    },
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>{getStepContent}</div>
            </div>
        </OrderConfirmationWrapper>
    );
});
