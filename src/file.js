/*
	Name: fileData
	Return: Array
	Default: [null, null, null]
	ArrayData: [0] = Extension, [1] = Absolute path, [2] = File Text
*/

var fs = require('fs');

var FileData = function(){
	return function(filePath, __dir) {
		var extension = null,
			absolutePath = null,
			fileText = null;

		if (typeof filePath === 'string') {
			extension = filePath.split('.').pop();
			var dirname = __dir,
				dir = dirname.split('/');

			if (dir[dir.length - 2] === 'node_modules') {
				dirname = dirname + '/../..';
			}

			var absolutePath = dirname + filePath,
				fileText = fs.readFileSync(absolutePath, 'utf8');
		}

		return [extension, absolutePath, fileText];
	}
};

module.exports = FileData;
