var kenobi = require('../kenobi'),
	assert = require('assert');

describe('Requests', function() {
	context('Valid requests', function() {
		context('without send view page as param', function() {
			it('should get response without view', function(done) {
				var url = 'https://api.github.com/users/raphamorim/repos';

				kenobi(url, function(page){
					assert.equal(typeof page, 'string');

					done();
				});
			});
		});
	});
});
