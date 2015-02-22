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
	 		return callback(ejs.render(str, {_: body}))
	 	else if (fileExt === 'jade')
	 		return callback(jade.renderFile(realPath, {_: body}))
	 	else
	 		return callback(response, error)
	});
});

module.exports = Kenobi;
