import { getDeviceSize } from '../../utils/check-device-size';

export interface IMenuConfig {
    label: string;
    url: string;
    iconClass: string;
}

const deviceSize = getDeviceSize();

export const accountMenuConfig: IMenuConfig[] = [
    {
        label: deviceSize > 400 ? 'Личная информация' : 'Профиль',
        iconClass: 'icon-user-tie',
        url: 'profile',
    },
    {
        label: deviceSize > 400 ? 'Книга адрессов' : 'Адреса',
        iconClass: 'icon-address-book',
        url: 'address-list',
    },
    {
        label: deviceSize > 400 ? 'Избранные товары' : 'Избранные',
        iconClass: 'icon-star-full',
        url: 'wishlist',
    },
    {
        label: deviceSize > 400 ? 'Мои заказы' : 'Заказы',
        iconClass: 'icon-cart',
        url: 'orders',
    },
    {
        label: 'Выйти',
        iconClass: 'icon-enter',
        url: '0',
    },
];
