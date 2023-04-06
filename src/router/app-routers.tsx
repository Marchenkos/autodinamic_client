import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { Layout } from '../pages/Layout';
import { LazyRouteElement } from './lazy-route-element';

const HomePage = React.lazy(() => import('../pages/Home.page'));
const AccountPage = React.lazy(() => import('../pages/Account.page'));
const AccountProfilePage = React.lazy(() => import('../pages/account/Profile.page'));
const AccountWishlistPage = React.lazy(() => import('../pages/account/Wishlist.page'));
const AccountOrdersPage = React.lazy(() => import('../pages/account/Orders.page'));
const AccountFeedbackPage = React.lazy(() => import('../pages/account/Feedback.page'));
const AccountAddressesPage = React.lazy(() => import('../pages/account/Addresses.page'));
const AccountSingleOrderPage = React.lazy(() => import('../pages/account/SingleOrder.page'));

const NewsPage = React.lazy(() => import('../pages/Account.page'));
const SingleNewPage = React.lazy(() => import('../pages/Account.page'));
const CatalogPage = React.lazy(() => import('../pages/Catalog.page'));
const BasketPage = React.lazy(() => import('../pages/Basket.page'));
const PromotionsPage = React.lazy(() => import('../pages/Promotions.page'));
const SingePromotionPage = React.lazy(() => import('../pages/SinglePromotion.page'));
const CheckOrderPage = React.lazy(() => import('../pages/CheckOrder.page'));
const DeliveryInfoPage = React.lazy(() => import('../pages/Delivery.page'));
const OrderConfirmationPage = React.lazy(() => import('../pages/OrderConfirmation.page'));
const ContactPage = React.lazy(() => import('../pages/Contact.page'));
const SearchResultPage = React.lazy(() => import('../pages/SearchResult.page'));
const CompareProductsPage = React.lazy(() => import('../pages/CompareProducts.page'));
const SingleProductPage = React.lazy(() => import('../pages/SingleProduct.page'));

const NotFoundPage = React.lazy(() => import('../pages/NotFound.page'));

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LazyRouteElement lazyComponent={HomePage} />} />

        <Route path="account" element={<LazyRouteElement lazyComponent={AccountPage} />}>
          <Route index element={<LazyRouteElement lazyComponent={AccountProfilePage} />} />
          <Route path="wishlist" element={<LazyRouteElement lazyComponent={AccountWishlistPage} />} />
          <Route path="orders" element={<LazyRouteElement lazyComponent={AccountOrdersPage} />} />
          <Route path="order-details/:id" element={<LazyRouteElement lazyComponent={AccountSingleOrderPage} />}/>
          <Route path="feedback" element={<LazyRouteElement lazyComponent={AccountFeedbackPage} />} />
          <Route path="address-list" element={<LazyRouteElement lazyComponent={AccountAddressesPage} />} />
        </Route>

        <Route path="catalog" element={<LazyRouteElement lazyComponent={CatalogPage} />}
         handle={{
          // you can put whatever you want on a route handle
          // here we use "crumb" and return some elements,
          // this is what we'll render in the breadcrumbs
          // for this route
          crumb: () => <Link to="/catalog">Catalog</Link>,
        }} />
        <Route path="order-confirmation" element={<LazyRouteElement lazyComponent={OrderConfirmationPage} />} />
        <Route path="basket" element={<LazyRouteElement lazyComponent={BasketPage} />} />
        <Route path="contacts" element={<LazyRouteElement lazyComponent={ContactPage} />} />
        <Route path="delivery" element={<LazyRouteElement lazyComponent={DeliveryInfoPage} />} />

        <Route path="search" element={<LazyRouteElement lazyComponent={SearchResultPage} />} />
        <Route path="promotions" element={<LazyRouteElement lazyComponent={PromotionsPage} />} />
        <Route path="promotions/:id" element={<LazyRouteElement lazyComponent={SingePromotionPage} />} />
        <Route path="check-order" element={<LazyRouteElement lazyComponent={CheckOrderPage} />} />
        <Route path="compare" element={<LazyRouteElement lazyComponent={CompareProductsPage} />} />
        <Route path="product-details/:id" element={<LazyRouteElement lazyComponent={SingleProductPage} />} />


        <Route path="*" element={<LazyRouteElement lazyComponent={NotFoundPage} />} />
      </Route>
    </Routes>
  );
};
