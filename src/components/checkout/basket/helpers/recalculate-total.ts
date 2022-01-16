import { Basket } from '../../../../graphql/entities';

export const recalculateTotal = (basket: Basket): Basket => {
    let total = 0;

    basket.orderItems.map((item) => {
        const fixedPrice = parseInt(item.price.toFixed(1));

        if (!item.discount) {
            total = total + item.price * item.count;
        } else {
            const discountCost = (item.price * item.discount) / 100;
            total = total + (item.price - discountCost) * item.count;
        }
    });

    return {
        ...basket,
        total: parseFloat(total.toFixed(2)),
    };
};
