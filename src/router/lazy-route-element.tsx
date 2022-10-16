import React from 'react';

import { LoadingComponent } from '../components/general/components/loading-view.component';

interface LazyRouteElementProps {
  lazyComponent: React.LazyExoticComponent<React.FC<{}>>;
  authProtected?: boolean;
}

export const LazyRouteElement: React.FC<LazyRouteElementProps> = (props) => {
  return <React.Suspense fallback={<LoadingComponent />}>
    <props.lazyComponent />
  </React.Suspense>
};
