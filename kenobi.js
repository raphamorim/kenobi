var Kenobi = (function(req, path, callback) {
	var request = require('request'),
		fs = require('fs'),
		ejs = require('ejs'),
		str = fs.readFileSync(__dirname + '/../..' + path, 'utf8');

	request(req, function(error, response, body) {
	 	return callback(ejs.render(str, {body: body}));
	});
});

module.exports = Kenobi;
