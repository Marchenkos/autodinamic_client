import { Basket } from '../graphql/entities';

export const createBasket = (): Basket => {
    return {
        subtotal: 0.0,
        total: 0.0,
        orderItems: [],
        deliveryAddress: undefined,
        discount: undefined,
    };
};
