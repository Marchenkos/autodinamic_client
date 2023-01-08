import * as React from 'react';
import { useLocation } from 'react-router-dom';

import './icomoon/style.css';
import { AppRoutes } from './router/app-routers';

export const App: React.FC = React.memo(function App() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);
  
  return (<AppRoutes />);
});
