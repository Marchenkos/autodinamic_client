import * as React from 'react';
import { useLocation } from 'react-router-dom';

import './icomoon/style.css';
import { AppRoutes } from './router/app-routers';

export const App: React.FC = React.memo(function App() {
  const { pathname } = useLocation();

  React.useEffect(() => {
      window.onbeforeunload = function () {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

  }, [pathname]);
  
  return (<AppRoutes />);
});
