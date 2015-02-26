/*!
 *
 * Copyright 2015 Raphael Amorim under the terms of the MIT
 * license found at http://github.com/raphamorim/kenobi/raw/master/LICENSE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var request = require('request'),
	render = require('./src/render.js'),
	getFileData = require('./src/file.js')();

var Kenobi = (function(req, path, fn) {
	var fileData = getFileData(path, __dirname);

	// Get extension data
	var extension = fileData[0],
		absolutePath = fileData[1],
		fileText = fileData[2];

	// If not exists path, use path like callback
	if (typeof path === 'function')
		fn = path;

	if (req === null || typeof req.request === 'undefined' ||
		req.request === true) {

		request(req, function(error, response, body) {
			render(body, extension, absolutePath, fileText, fn, response, error);
		});

	} else if (req.request === false) {
		delete req.request;

		render(req, extension, absolutePath, fileText, fn);
	}
});

module.exports = Kenobi;
