import PropTypes from 'prop-types';

import doesUserHaveValidScopes from '../../helpers/doesUserHaveValidScopes';

const ViewAuthorizer = ({ accessScopes, children }) => {
    const hasUserGotValidScopes = doesUserHaveValidScopes(accessScopes);
    if (hasUserGotValidScopes) {
        return children;
    }
    return null;
}

ViewAuthorizer.propTypes = {
    accessScopes: PropTypes.arrayOf(PropTypes.string),
};

ViewAuthorizer.defaultProp = {
    accessScopes: [],
};

export default ViewAuthorizer;
