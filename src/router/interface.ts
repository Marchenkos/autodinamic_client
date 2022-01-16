import { ReactNode, LazyExoticComponent, ComponentType } from 'react';

export interface IRouteConfig {
    path: string;
    rootPath?: string;
    key: string;
    exact: boolean;
    component: React.FC<{}>;
    routes?: IRouteConfig[];
}

export interface RenderRoutesProps {
    routes: IRouteConfig[];
}
export interface IRoute {
    // Path, like in basic prop
    path: string;
    // Exact, like in basic prop
    exact: boolean;
    // Preloader for lazy loading
    fallback: NonNullable<ReactNode> | null;
    // Lazy Loaded component
    component?: LazyExoticComponent<ComponentType<any>>;
    // Sub routes
    routes?: IRoute[];
    // Redirect path
    redirect?: string;
    // If router is private, this is going to be true
    private?: boolean;
}
