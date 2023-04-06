export enum PRODUCT_BRAND {
    PIONEER = 'PIONEER',
    MYSTERY = 'MYSTERY',
    ACV = 'ACV',
    JVC = 'JVC',
}

export enum PRODUCT_TYPE {
    ACUSTIC = 'ACUSTIC',
    MAGNITOLA = 'MAGNITOLA',
    NAVIGATOR = 'NAVIGATOR',
    VIGEOREG = 'VIGEOREG',
}

export enum SORT_PARAMS {
    max_price = 'max_price',
    min_price = 'min_price',
    new = 'new',
}

export interface SortSection {
    name: string;
    value: string[];
}

export const sortSectionsConfig: SortSection[] = [
    {
        name: 'обновлению',
        value: ['new'],
    },
    {
        name: 'цене',
        value: ['max_price', 'min_price'],
    },
];
export interface ProductDescription {
    name: string;
    value: string | null;
}

export interface DeliveryMethod {
    city: string;
    methods: DeliveryType[];
}

//COST

export interface DeliveryType {
    name: string;
    description: string;
}

export interface Product {
    id: number;
    code: string;
    name: string;
    part_number: string;
    type: PRODUCT_TYPE;
    brand: PRODUCT_BRAND;
    images: string[];
    guarantee?: number;
    price: number;
    discount?: number;
    description: ProductDescription[];
    maker?: string;
    is_in_stock: boolean;
    delivery_type?: DeliveryType[];
}
