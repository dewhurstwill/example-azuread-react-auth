// Node Modules
import React from 'react';

// Style
import './style/w3css.css'

// Provider HOCs
import ReduxProvider from './reduxProvider';
import ReactRouter from './reactRouter';
import AuthProvider from './authProvider';

const AppConfiguration = ({ children }) => (
    <ReduxProvider>
        <ReactRouter>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ReactRouter>
    </ReduxProvider>
  );

export default AppConfiguration;
