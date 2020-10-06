const BASE_URL = "http://localhost:3001" // Backend Base URL (In this example this is our auth backend)

export default {
	tenantId: "", // Azure tenant ID
	clientId: "", // Azure client ID
	redirectUri: `${BASE_URL}/api/v1/auth/login`,
	authUrl: `${BASE_URL}/api/v1/auth`,
};