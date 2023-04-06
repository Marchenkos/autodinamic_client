import { Address } from '../mockData/user';
import MagnitolsImage from '../../public/assets/category/magnitol.png';
import SoundSpeakerImage from '../../public/assets/category/sound-speaker.png';
import SumpliferImage from '../../public/assets/category/sumplifer.png';
import SignalisationImage from '../../public/assets/category/signalisation.png';
import VideoRegImage from '../../public/assets/category/video-registration.png';
import SubImage from '../../public/assets/category/sub.png';

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

export enum PRODUCT_CATEGORY_TYPE {
    ALL = 'all',
    MAGNITOLS = 'auto_magnitol',
    SOUND_SPEAKER = 'auto_speaker',
    SUB = 'auto_subwoofer',
    DVRS = 'auto_dvr',
    SIGNALISATION = 'car_alarm',
    GPS_NAVIGATOR = 'gps_navigator',
    AUTO_AMPLIFIER = 'auto_amplifier',
}

export const PRODUCT_CATEGORY_TO_CATEGORY_IMAGES = {
    [PRODUCT_CATEGORY_TYPE.AUTO_AMPLIFIER]: SumpliferImage,
    [PRODUCT_CATEGORY_TYPE.DVRS]: VideoRegImage,
    [PRODUCT_CATEGORY_TYPE.MAGNITOLS]: MagnitolsImage,
    [PRODUCT_CATEGORY_TYPE.SIGNALISATION]: SignalisationImage,
    [PRODUCT_CATEGORY_TYPE.SOUND_SPEAKER]: SoundSpeakerImage,
    [PRODUCT_CATEGORY_TYPE.SUB]: SubImage,
};

export interface ICategoryDetails {
  field_name: string;
  field_type: string;
  section_name: string;
  display_field_name: string;
  display_section_name: string;
  unit?: string;
}

export interface ICategory {
  id: number;
  name: string;
  displayName: string;
  allDetails: ICategoryDetails[];
  createdAt: Date;
}


export interface IBrand {
  id: number;
  name: string;
  displayName: string;
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

export interface IProduct {
  id: number;
  name: string;
  sku: string;
  description: string;
  partyNumber: string;
  price: number;
  discount?: number;
  guarantee?: number;
  maker?: string;
  isInStock: boolean;
  images?: [ProductImage];
  //TODO: How to define details for products from different Categories
  details: any;
  createdAt: Date;
  updatedAt: Date;
  category: ICategory;
  brand: IBrand;
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

export interface OrderProduct extends IProduct {
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
