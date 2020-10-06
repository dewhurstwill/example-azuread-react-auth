import { SET_AUTHENTICATION_TOKEN_AND_STATE } from '../../actions/userInfo/userInfoActions';
import { setJwtInLocalStorage } from '../../helpers/auth/authenticationHelper';
import { LOG_OUT_USER } from '../../actions/logOut/logoutActions';

const initialState = {
	firstName: '',
	lastName: '',
	fullName: '',
	username: '',
	scopes: [],
	token: null
};

const userInfoReducer = (state = { ...initialState }, action) => {
	const nextState = { ...state };

	switch (action.type) {
    case SET_AUTHENTICATION_TOKEN_AND_STATE:
    	nextState.token = action.payload.token;
	  	setJwtInLocalStorage(action.payload.token);
      return {
				...nextState,
				fullName: action.payload.decodedJwt.name,
				firstName: action.payload.decodedJwt.given_name,
				lastName: action.payload.decodedJwt.family_name,
				username: action.payload.decodedJwt.upn,
				scopes: action.payload.decodedJwt.roles ? 
					[...action.payload.decodedJwt.roles] : 
					[],
      };
    case LOG_OUT_USER:
      return {
        ...nextState,
				token: initialState.token,
				username: initialState.username,
				firstName: initialState.firstName,
				lastName: initialState.lastName,
				fullName: initialState.fullName,
      };
    default:
			return {
				...state,
			};
  	}
};

export default userInfoReducer;
