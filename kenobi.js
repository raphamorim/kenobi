var Kenobi = (function(req, path, callback) {
	var request = require('request'),
		fs = require('fs'),
		ejs = require('ejs'),
		jade = require('jade'),
		fileExt = 'json';

	if (typeof path === 'string') {
		fileExt = path.split('.').pop();

		var realPath = __dirname + '/../..' + path,
			str = fs.readFileSync(realPath, 'utf8');
	}

	if (typeof path === 'function')
		callback = path;

	request(req, function(error, response, body) {
		if (fileExt === 'ejs')
	 		return callback(ejs.render(str, {body: body}, error))
	 	else if (fileExt === 'jade')
	 		return callback(jade.renderFile(realPath, {body: body}, error))
	 	else
	 		return callback(body, error)
	});
});

module.exports = Kenobi;
