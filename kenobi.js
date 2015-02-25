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

	//TODO: IF NOT HAVE DEFINED FILE EXTENSION

	if (req === null || typeof req.request === 'undefined' || req.request === true) {

		request(req, function(error, response, body) {
			if (fileExt === 'ejs') {
				if (typeof body === 'string')
					body = JSON.parse(JSON.stringify(eval('('+body+')')));

	 			return callback(ejs.render(str, {_: body}), response, error);
	 		}
	 		else if (fileExt === 'jade'){
	 			if (typeof body === 'string')
					body = JSON.parse(JSON.stringify(eval('('+body+')')));

	 			return callback(jade.renderFile(realPath, {_: body}), response, error)
	 		}
	 		else {
	 			return callback(response, error)
	 		}
		});

	} else if (req.request === false) {
		delete req.request;

		if (fileExt === 'ejs') {
	 		return callback(ejs.render(str, {_: req}), null, null)
	 	}
	 	else if (fileExt === 'jade'){
	 		return callback(jade.renderFile(realPath, {_: req}), null, null)
	 	} else {
	 		// Don't have this format
	 	}
	} else {
		return callback(null, null, {'err': 'request field must be true or false'})
	}
});

module.exports = Kenobi;
