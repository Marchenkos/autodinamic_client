import React, { useCallback } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

import { parseDateWithoutTime } from '../../../../utils/parse-date';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    step: {
        '&$completed': {
            color: '#60BDBF',
        },
        '&$active': {
            color: '#60BDBF',
        },
    },
    alternativeLabel: {},
    active: {}, //needed so that the &$active tag works
    completed: {},
    disabled: {},
    labelContainer: {
        '&$alternativeLabel': {
            marginTop: 0,
        },
    },
}));

export function getSteps() {
    return [
        'Заказ создан',
        'Принят в обработку',
        'Подтвержден',
        'Оформление доставки',
        'В пути',
        'Доставлен в пункт самовывоза / отделение почты',
    ];
}

interface OrderStepperProps {
    currentStep: number;
    currentStepDate: Date;
}

export const OrderStepper: React.FC<OrderStepperProps> = React.memo(function OrderStepper({
    currentStep,
    currentStepDate,
}: OrderStepperProps) {
    const classes = useStyles();
    const steps = getSteps();

    const getStepContent = useCallback(
        (step: number): string => {
            if (step === currentStep) {
                return parseDateWithoutTime(currentStepDate);
            }

            return '';
        },
        [currentStep, currentStepDate]
    );

    return (
        <Stepper activeStep={currentStep} orientation="vertical" style={{ backgroundColor: 'transparent' }}>
            {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel
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
                    <StepContent>
                        <Typography>{getStepContent(index)}</Typography>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    );
});
