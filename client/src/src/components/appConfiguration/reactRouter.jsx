import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './configureStore';

function ReactRouter({ children }) {
  return (
    <ConnectedRouter history={history}>
      {children}
    </ConnectedRouter>
  );
}

export default ReactRouter;
