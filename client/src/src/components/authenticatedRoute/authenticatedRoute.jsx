import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import doesUserHaveValidScopes from '../../helpers/doesUserHaveValidScopes';
import { getValidTokenAndRedirectIfInvalid } from '../../helpers/auth/authenticationHelper';

const AuthenticatedRoute = (props) => {
    const { component: Child, requiredUserScopes, ...rest } = props;

    let { token } = useSelector(state => state.userInfo);

    const userHasValidScopes = doesUserHaveValidScopes(requiredUserScopes);
    if (token == null) {
        token = getValidTokenAndRedirectIfInvalid();
        return null;
    }

    return (
        <Route
            {...rest}
            render={componentProps => {
                if (userHasValidScopes === false) {
                    return <Redirect to="/" />;
                }
                return <Child {...componentProps} />;
            }}
        />
    );
}

AuthenticatedRoute.propTypes = {
  requiredUserScopes: PropTypes.arrayOf(PropTypes.string),
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]).isRequired,
};

AuthenticatedRoute.defaultProps = {
  requiredUserScopes: [],
};

export default AuthenticatedRoute;
