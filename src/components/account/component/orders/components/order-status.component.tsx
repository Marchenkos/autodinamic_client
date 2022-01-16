import React from 'react';

import { PulseCircle } from '../../../../../ui/ pulse-circle.component';

interface OrderStatusProps {
    state: string;
}

export const OrderStatus: React.FC<OrderStatusProps> = React.memo(function OrderStatus({ state }: OrderStatusProps) {
    switch (state) {
        case 'Успешно завершен':
            return <PulseCircle />;
        case 'Отменен':
            return <PulseCircle />;
        case 'В процессе':
            return <PulseCircle />;
        default:
            return null;
    }
});
