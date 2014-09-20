var kenobi = require('../kenobi'),
	assert = require('assert');

describe('Requests', function() {
	context('Valid requests', function() {
		context('without send view page as param', function() {
			it('should get response without view', function(done) {
				var url = 'http://curto-api.herokuapp.com/products';

				kenobi(url, function(page, response){

					assert.equal(response.statusCode, 200);
					assert.equal(typeof response, 'object');

					assert.equal(typeof page, 'string');
					done();
				});
			});
		});
	});
});
