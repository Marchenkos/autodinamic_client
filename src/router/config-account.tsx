import React, { lazy } from 'react';
import { IRoute } from './interface';
import { LoadingComponent } from '../components/general/components/loading-view.component';

export const accountRoutesConfig: IRoute[] = [
    {
        path: '/account',
        exact: true,
        redirect: '/account/profile',
        fallback: <LoadingComponent />,
    },
    {
        path: '/account/profile',
        component: lazy(() => import('../components/account/component/profile/profile.screen')),
        exact: false,
        private: false,
        fallback: <LoadingComponent />,
    },
    {
        path: '/account/wishlist',
        component: lazy(() => import('../components/account/component/wishlist/wishlist.screen')),
        exact: false,
        private: false,
        fallback: <LoadingComponent />,
    },
    {
        path: '/account/orders',
        component: lazy(() => import('../components/account/component/orders/orders.screen')),
        exact: false,
        private: false,
        fallback: <LoadingComponent />,
    },
    {
        path: '/account/order-details/:id',
        component: lazy(() => import('../components/account/component/orders/components/order-details.component')),
        exact: false,
        private: false,
        fallback: <LoadingComponent />,
    },
    {
        path: '/account/feedback',
        component: lazy(() => import('../components/account/screens/account-screens/feedback.component')),
        exact: false,
        private: false,
        fallback: <LoadingComponent />,
    },
    {
        path: '/account/address-list',
        component: lazy(() => import('../components/account/component/address-list/address-list.screen')),
        exact: false,
        private: false,
        fallback: <LoadingComponent />,
    },
];
