import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { normalize } from 'react-style-reset/string';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { App } from './App';
import { useStore } from './store/useStore';
import { DEFAULT_THEME } from './default-theme';

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
                <ThemeProvider theme={DEFAULT_THEME}>
                    <GlobalStyles />
                    <App />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
});

ReactDOM.render(<Main />, document.getElementById('output'));
