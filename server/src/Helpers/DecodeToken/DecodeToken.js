// Local Modules
const { GetTokenFromHeader } = require("../GetTokenFromHeader/GetTokenFromHeader");

// Node Modules
const jwt = require("jsonwebtoken");

const decodeToken = authHeader => {
	// Get token from the header
	const token = GetTokenFromHeader(authHeader);
	// If token null, return null
	if (token == null) return null;
	// Decode the token and return it
	return jwt.decode(token, {
		complete: true,
    json: true,
  });
};

exports.DecodeToken = decodeToken;