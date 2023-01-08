export interface Address {
    id: number;
    address: string;
    postcode: string;
    isDefault: boolean;
    city: string;
}

export enum ORDER_STATUS {
    SUCCESS,
    CANCELED,
    IN_PROGRESS,
}

export interface OrderProduct {
    id: string;
    name: string;
    price: number;
    productCode: string;
    count: number;
}

export interface OrderDetails {
    currentStep: number;
    currentStepDate: string;
    product: OrderProduct[];
}
