import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PermittedRoutes from './PermittedRoutes';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AuthProvider } from './module/Authentication/AuthContext';
// import { ThemeProvider } from '@mui/material';
// import theme from "./common/themes/theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <AuthProvider>
        {/* <ThemeProvider theme={theme}> */}
        <PermittedRoutes />
        {/* </ThemeProvider> */}
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
