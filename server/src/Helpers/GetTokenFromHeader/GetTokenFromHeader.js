const getTokenFromHeader = authHeader => {
	// Get the token prefix and token and check if the prefix is invalid or if the token is null
	const [prefix, token] = authHeader.split(' ');
	// Validate token isn't null and prefix is bearer
	if (prefix.toLowerCase() !== 'bearer' || token == null) return null;
	// Return JWT token string
	return token;
};
  
exports.GetTokenFromHeader = getTokenFromHeader;