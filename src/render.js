/*
	@name: Render
	@return: function
*/

var ejs = require('ejs'),
	jade = require('jade');

function Render(body, ext, path, text, fn, response, error) {
	// EJS
	if (ext === 'ejs') {
		if (typeof body === 'string')
			body = JSON.parse(JSON.stringify(eval('(' + body + ')')))

		ejs.renderFile(path, {
			_: body
		},function(err, result) {
    		if (err) console.log(err);
    		return fn(result, response, error)
		});

	// JADE
	} else if (ext === 'jade') {
		if (typeof body === 'string')
			body = JSON.parse(JSON.stringify(eval('(' + body + ')')))

		return fn(jade.renderFile(path, {
			_: body
		}), response, error)

	// HTML
	} else if (ext === 'html') {
		if (typeof body === 'string')
			body = JSON.parse(JSON.stringify(eval('(' + body + ')')))

		for (var key in body) {
   			text = text.replace('{{' + key + '}}', body[key]);
		}

		return fn(text, response, error)

	// WITHOUT FILE (return only response)
	} else {
		return fn(response, error)
	}
};

module.exports = Render;
