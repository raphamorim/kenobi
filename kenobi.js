var Kenobi = (function(req, path, callback) {
	var request = require('request'),
		fs = require('fs'),
		ejs = require('ejs'),
		jade = require('jade'),
		fileExt = path.split('.').pop(),
		realPath = __dirname + '/../..' + path;
		str = fs.readFileSync(realPath, 'utf8');

	request(req, function(error, response, body) {
		if (fileExt === 'ejs')
	 		return callback(ejs.render(str, {body: body}));
	 	else if (fileExt === 'jade')
	 		return callback(jade.renderFile(realPath, {body: body}));
	 	else
	 		return false;
	});
});

module.exports = Kenobi;
