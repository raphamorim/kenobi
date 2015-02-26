/*
	Name: fileData
	Return: Array
	Default: [null, null, null]
	ArrayData: [0] = Extension, [1] = Absolute path, [2] = File Text
*/

var ejs = require('ejs'),
	jade = require('jade');

function Render(body, ext, path, text, fn, response, error) {
	// EJS
	if (ext === 'ejs') {
		if (typeof body === 'string')
			body = JSON.parse(JSON.stringify(eval('(' + body + ')')));

		return fn(ejs.render(text, {
			_: body
		}), response, error)

	// JADE
	} else if (ext === 'jade') {
		if (typeof body === 'string')
			body = JSON.parse(JSON.stringify(eval('(' + body + ')')));

		return fn(jade.renderFile(path, {
			_: body
		}), response, error)

	// HTML
	} else if (ext === 'html') {

		return fn(null, null, null);

	// PURE REQUEST
	} else {
		return fn(response, error)
	}
};

module.exports = Render;
