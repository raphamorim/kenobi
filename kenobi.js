var Kenobi = (function(req, path, callback) {
	var request = require('request'),
		fs = require('fs'),
		ejs = require('ejs'),
		jade = require('jade'),
		fileExt = 'json';

	if (typeof path === 'string') {
		fileExt = path.split('.').pop();
		var dirname = __dirname,
			dir = dirname.split('/');

		if (dir[dir.length - 2] === 'node_modules') {
			dirname = dirname + '/../..';
		}

		var realPath = __dirname + path,
			str = fs.readFileSync(realPath, 'utf8');
	}

	if (typeof path === 'function')
		callback = path;

	request(req, function(error, response, body) {
		if (fileExt === 'ejs') {
			if (typeof body === 'string') {
				body = JSON.parse(JSON.stringify(eval('('+body+')')));
			}

	 		return callback(ejs.render(str, {_: body}), response, error);
	 	}
	 	else if (fileExt === 'jade')
	 		return callback(jade.renderFile(realPath, {_: body}))
	 	else
	 		return callback(response, error)
	});
});

module.exports = Kenobi;
