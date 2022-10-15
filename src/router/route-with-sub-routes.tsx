import React, { Suspense } from 'react';
import { redirect, Route } from 'react-router-dom';
import { IRoute } from './interface';

const RouteWithSubRoutes = (route: IRoute) => {
    /** Authenticated flag */
    const authenticated: boolean = false;

    return (
        <Suspense fallback={route.fallback}>
            <Route
                path={route.path}
                render={(props) =>
                    route.redirect ? (
                        <Redirect to={route.redirect} />
                    ) : route.private ? (
                        authenticated ? (
                            route.component && <route.component {...props} routes={route.routes} />
                        ) : (
                            <Redirect to="/home/login" />
                        )
                    ) : (
                        route.component && <route.component {...props} routes={route.routes} />
                    )
                }
            />
        </Suspense>
    );
};

export default RouteWithSubRoutes;
