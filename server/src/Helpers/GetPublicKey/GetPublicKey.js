// Node Modules
const request = require('request-promise-native');

const getPublicKey = async kid => {
	// Make the request for the Microsoft public keys
	const response = await request({
	  url: 'https://login.microsoftonline.com/common/discovery/keys',
	  json: true,
	});
  
	const key = response.keys.find(key => key.kid === kid);
	return (key != null)
	  ? key
	  : null;
};

exports.GetPublicKey = getPublicKey;