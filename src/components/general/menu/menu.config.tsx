import React from 'react';

import { Catalog } from '../../product-list/screens/catalog.component';

export interface MenuSearchParams {
  param: string;
  value: string;
}

export interface MenuConfig {
    name: string;
    url: string;
    component?: React.ReactNode;
    subLinks?: MenuConfig[];
    searchParams?: MenuSearchParams[]
}

export const menuConfig: MenuConfig[] = [
    {
        name: 'Каталог',
        url: '/catalog',
        component: <Catalog />,
        searchParams: [
          {
            param: 'category',
            value: 'all'
          }
        ],
        subLinks: [
            {
                name: 'Магнитолы',
                url: '/catalog',
                searchParams: [
                  {
                    param: 'category',
                    value: 'magnitols'
                  }
                ]
            },
            {
                name: 'Автоакустика',
                url: '/catalog',
                searchParams: [
                  {
                    param: 'category',
                    value: 'sound_speakers'
                  }
                ]
            },
            {
                name: 'Сабвуферы',
                url: '/catalog',
                searchParams: [
                  {
                    param: 'category',
                    value: 'subwoofers'
                  }
                ]
            },
            {
                name: 'Видеорегистраторы',
                url: '/catalog',
                searchParams: [
                  {
                    param: 'category',
                    value: 'dvrs'
                  }
                ]
            },
            {
                name: 'Сигнализация',
                url: '/catalog',
                searchParams: [
                  {
                    param: 'category',
                    value: 'signalisation'
                  }
                ]
            },
            {
                name: 'Усилители звука',
                url: '/catalog',
                searchParams: [
                  {
                    param: 'category',
                    value: 'auto_amplifiers'
                  }
                ]
            },
        ],
    },
    {
      name: 'Акции',
      url: '/promotions',
    },
    {
        name: 'Проверить заказ',
        url: '/check-order',
    },

    {
        name: 'Доставка',
        url: '/delivery',
    },

    {
        name: 'Наш магазин',
        url: '/contacts',
    },

];
