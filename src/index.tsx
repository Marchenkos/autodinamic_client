import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { normalize } from 'react-style-reset/string';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { App } from './App';
import { useStore } from './store/useStore';
import { DEFAULT_THEME } from './default-theme';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingComponent } from './components/general/components/loading-view.component';

const GlobalStyles = createGlobalStyle`
  ${normalize};
`;

export const Main: React.FC = React.memo(function Main() {
    const store = useStore();

    if (!store) {
        return null;
    }

    return (
        <BrowserRouter>
            <Provider store={store.store}>
                <PersistGate loading={<LoadingComponent />} persistor={store.persistor}>
                  <ThemeProvider theme={DEFAULT_THEME}>
                      <GlobalStyles />
                      <App />
                  </ThemeProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    );
});

ReactDOM.render(<Main />, document.getElementById('output'));
