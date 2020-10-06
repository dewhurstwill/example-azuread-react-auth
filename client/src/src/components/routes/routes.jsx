import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

export const RedirectLoading = React.lazy(() => import('../RedirectLoading/RedirectLoading'));
export const AuthenticationFailed = React.lazy(() => import('../authenticationFailed/authenticationFailed'));
export const LogOut = React.lazy(() => import('../LogOut/LogOut'));
export const SiteRoot = React.lazy(() => import('../SiteRoot/SiteRoot'));

const Routes = () => (
    <Suspense fallback={<div></div>}>
        <Switch>
            <Route path="/auth" component={RedirectLoading} />
            <Route path="/auth-failed" component={AuthenticationFailed} />
            <Route path="/log-out" component={LogOut} />
            <Route path="/login" component={RedirectLoading} />
            <Route path="/logout" component={LogOut} />
            <Route path="/" component={SiteRoot} />
        </Switch>
    </Suspense>
);

export default Routes;