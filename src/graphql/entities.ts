import { Address } from '../mockData/user';

export enum DELIVERY_METHODS {
    POST = 'Доставка почтой',
    PICKUP = 'Самовывоз',
}

export enum PAYMENT_METHODS {
    CASH = 'Наличными',
    CART = 'Картой',
}

export interface DescriptionSectionFields {
    fieldName: string;
    enFieldName: string;
    sectionName: string;
    unit?: string;
}

export interface Category {
    category_name: string;
    title: string;
    description_sections: string[];
    description_section_fields: DescriptionSectionFields[];
}

export interface CategoryFields {
    column_name: string;
    is_nullable: string;
    data_type: string;
    column_comment?: string;
}

export interface FilterSection {
    filter_name: string;
    enName: string;
    values: string[];
    type: string;
}

export interface Basket {
    readonly subtotal: number;
    readonly total: number;
    readonly orderItems: OrderProduct[];
    readonly deliveryAddress?: Address;
    readonly discount?: string;
}

export interface DeliveryType {
    city: string;
    methods: DeliveryMethod[];
}

export interface DeliveryMethod {
    name: string;
    description: string;
}

export interface GeneralProduct {
    id: string;
    code: string;
    full_name: string;
    part_number: string;
    brand: string;
    type: string;
    images?: ProductImage[];
    guarantee?: number;
    maker?: string;
    is_in_stock: boolean;
    price: number;
    discount?: number;
    description: string;
    category_name: string;
    creation_date?: string;
}

export interface ProductField {
    column_name: string;
    is_nullable: string;
    data_type: string;
    column_comment?: string;
}

export interface ProductImage {
    deleteUrl: string;
    displayUrl: string;
}

export interface Promotion {
    id: number;
    title: string;
    short_description: string;
    description: string;
    image: string;
    start_date: Date;
    end_date?: Date;
}

export interface OrderProduct extends GeneralProduct {
    count: number;
}
export interface AddressInfo {
    id: number;
    address: string;
    city: string;
    postcode: string;
    isDefault: boolean;
}

export interface OrderAddressInfo {
    address: string;
    city: string;
    postcode: string;
}

export interface Wishlist {
    category: string;
    product_id: number;
}

export enum ORDER_STATUS {
    SUCCESS = 'delivered',
    CANCELED = 'canceled',
    IN_PROGRESS = 'in-progress',
}

export interface OrderItem {
    productId: string;
    count: number;
}

export interface UserDetailsData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
export interface UserDetailsDataForm extends UserDetailsData {
    email: string;
}

export interface NewOrder {
    orderId: string;
    userEmail: string;

    status: ORDER_STATUS;
    deliveryType: DELIVERY_METHODS;
    paymentType: PAYMENT_METHODS;

    address: OrderAddressInfo;
    deliveryCost: number;
    items: OrderItem[];
    subtotal: number;
    total: number;

    userDetails: UserDetailsData;

    createdAt: Date;
    currentStep: number;
    stepDate: Date[];
    isMailing: boolean;
}

export interface Order {
    orderId: string;
    userEmail: string;

    status: string;
    deliveryType: string;
    address: OrderAddressInfo;
    deliveryCost: number;
    items: OrderItem[];
    subtotal: number;
    total: number;

    userDetails: UserDetailsData;

    createdAt: Date;
    currentStep: number;
    stepDate: Date[];
    isMailing: boolean;
    productItems: OrderProduct[];
}

export interface CompareResponse {
    items: GeneralProduct[];
    details: any;
    detailsFields: CategoryFields[][];
    generalFields: CategoryFields[];
}
