// Dev dependencies
if(process.env.NODE_ENV === "Dev"){ require("dotenv").config(); }

// Node Modules
const express = require("express")
const queryString = require("querystring");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");

// Express Router
const router = express.Router();

// Local Modules
const { GetPublicKey } = require("../Helpers/GetPublicKey/GetPublicKey");
const { DecodeToken } = require("../Helpers/DecodeToken/DecodeToken");

// Validate environment variables are set
const requiredEnvironmentVariables = [
	"CLIENT_ID",
	"TENANT_ID",
	"FRONTEND_URL"
];

// Filter array of required variables to a list of unset variables
const unsetKeys = requiredEnvironmentVariables.filter(key => !(typeof process.env[key] !== "undefined"));

// Throw an error if there are any unset required keys
if (unsetKeys.length > 0) throw new Error(`Required environment variables are not set: [${unsetKeys.join(", ")}]`);

// Environment Variables
const {
    CLIENT_ID,
    TENANT_ID,
    FRONTEND_URL
} = process.env;

// Azure AD login route
router.post("/login", async (req, res) => {
	try {
		// Get the data from the request and decode the access token
		const { 
      access_token, 
      state
    } = req.body;
		
		// Decode the token
		const decoded = DecodeToken(`Bearer ${access_token}`);
  
		// Get the public key for the token and convert it to a pem key
		const key = await GetPublicKey(decoded.header.kid);

		// Convert key to PEM
		const pem = jwkToPem(key);
  
		// Verify the token and the issuer are valid
	  jwt.verify(access_token, pem, {
			audience: CLIENT_ID,
			issuer: `https://sts.windows.net/${TENANT_ID}/`,
		});

		// Build the query string from the data
		const query = queryString.stringify({ state });

		// Define the redirect URL and return the response
		return res.status(301).redirect(`${FRONTEND_URL}/auth?${query}&token=${access_token}`);
		
	} catch (error) {
		// Convert error message to query string
		const query = queryString.stringify({ 
			message: error.message
		});
		
		// Redirect to error page
		return res.status(301).redirect(`${FRONTEND_URL}/auth-failed?${query}`);
	}
});

// Return 403, Forbidden: Action not permitted
router.post("/*", (req, res) => res.status(403).send("🔒 403: Action not permitted"));
router.get("/*", (req, res) => res.status(403).send("🔒 403: Action not permitted"));
router.patch("/*", (req, res) => res.status(403).send("🔒 403: Action not permitted"));
router.put("/*", (req, res) => res.status(403).send("🔒 403: Action not permitted"));
router.delete("/*", (req, res) => res.status(403).send("🔒 403: Action not permitted"));

module.exports = router;