import React from 'react';
import { Routes } from 'react-router-dom';

import { IRoute } from './interface';
import RouteWithSubRoutes from './route-with-sub-routes';
interface IProps {
    routes: IRoute[];
}

const RenderRoutes: React.FC<IProps> = ({ routes }) => {
    return (
        <Routes>
            {routes.map((route: IRoute) => (
                <RouteWithSubRoutes key={route.path} {...route} />
            ))}
        </Routes>
    );
};

export default RenderRoutes;
