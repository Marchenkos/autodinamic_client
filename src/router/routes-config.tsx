import React from 'react';
import { Switch } from 'react-router-dom';

import { IRoute } from './interface';
import RouteWithSubRoutes from './route-with-sub-routes';
interface IProps {
    routes: IRoute[];
}

const RenderRoutes: React.FC<IProps> = ({ routes }) => {
    return (
        <Switch>
            {routes.map((route: IRoute) => (
                <RouteWithSubRoutes key={route.path} {...route} />
            ))}
        </Switch>
    );
};

export default RenderRoutes;
