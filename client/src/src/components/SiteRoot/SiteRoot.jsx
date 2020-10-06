// Node Modules
import React from 'react';
import jwt from 'jsonwebtoken'
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// Redux actions
import { setTokenAndStateInRedux } from '../../actions/userInfo/userInfoActions';

// Auth helpers
import { getJwtFromLocalStorage } from '../../helpers/auth/authenticationHelper';

// Authenticated Route
import AuthenticatedRoute from '../authenticatedRoute/authenticatedRoute';

// Local Modules
export const Home = React.lazy(() => import('../Pages/Home/Home'));
export const Secure = React.lazy(() => import('../Pages/Secure/Secure'));
export const NotFoundPage = React.lazy(() => import('../Pages/404/404'));

// Site Route Component
const SiteRoot = ({ location }) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        const token = getJwtFromLocalStorage();
        if (token != null) {
            const decodedJwt = jwt.decode(token);
            dispatch(setTokenAndStateInRedux({ token, decodedJwt }));
        }
    }, [dispatch]);

    return (
        <>
            { location.pathname !== '/' ? <div></div> : null }
            <Switch>
                <AuthenticatedRoute exact path="/Secure" component={Secure} />
                <Route exact path="/" component={Home} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    );
}

export default SiteRoot;