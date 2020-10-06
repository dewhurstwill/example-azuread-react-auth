export const SET_AUTHENTICATION_TOKEN_AND_STATE = 'SET_AUTHENTICATION_TOKEN_AND_STATE';
export const setTokenAndStateInRedux = data => ({
	type: SET_AUTHENTICATION_TOKEN_AND_STATE,
	payload: data,
});

export const HYDRATE_USER_INFO_STATE_FROM_LOCAL_STORAGE = 'HYDRATE_USER_INFO_STATE_FROM_LOCAL_STORAGE';
export const hydrateUserInfoStateFromLocalStorage = data => ({
	type: HYDRATE_USER_INFO_STATE_FROM_LOCAL_STORAGE,
	payload: data,
});
