export const calculateDiscount = (price: number, discount: number): string => {
    const discountPrice = (discount * price) / 100;

    return (price - discountPrice).toFixed(1);
};
