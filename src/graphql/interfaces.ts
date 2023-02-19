import { AddressInfo, IProduct } from './entities';

export type SimpleGQLResponse<Key extends string, T> = {
    [X in Key]: T;
};

export enum SORT_DIRECTION {
  LOW_PRICE = "LOW_PRICE",
  HIGHT_PRICE = "HIGHT_PRICE",
  NEW = "NEW",
  DISCOUNT = "DISCOUNT"
}

export class FilterObject {
    field_name: string;
    view_field_name?: string;
    values: string[];
    category: string;
    type: string;
}

export class RequestToCallbackResponse {
    isSuccess: boolean;
}

export class ICategoryName {
  name: string;
  displayName: string;
}

export interface AuthResponse {
    token: string;
}

export interface OrderDetailsResponse {
    orderId: string;
    userEmail: string;
}

export interface IProductList {
    readonly count: string;
    readonly products: Array<IProduct>;
}

export interface LoadProductsPayload {
    limit: number;
    startId?: number;
}

export interface RequestToCallbackPayload {
    name: string;
    email: string;
    message: string;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
    avatar?: string;
    birthday?: string;
    addresses?: AddressInfo[];
    wishlist?: IProduct[];
}
