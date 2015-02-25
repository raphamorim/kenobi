var kenobi = require('../kenobi'),
	nock   = require('nock'),
	assert = require('assert');

describe('Requests', function() {
	context('Valid requests', function() {
		context('Url as param', function() {
			it('should get response without view', function(done) {
				var url = 'http://test.com',
					api = nock(url)
						  .get('/')
						  .reply(200, {'data': true});

				kenobi(url, function(res, err){
					assert.equal(res.statusCode, 200);
					assert.equal(typeof res, 'object');
					assert.equal(err, null);

					done();
				});
			});
		});
	});
	context('Invalid requests', function() {
		context('Not exitent url as param', function() {
			it('should get error', function(done) {
				kenobi('http://$.com', function(res, err){
					assert.equal(res.statusCode, 404);
					assert.equal(typeof res, 'object');
					assert.equal(err, null);

					done();
				});
			});
		});
		context('Invalid url as param', function() {
			it('should get error', function(done) {
				kenobi(null, function(res, err){
					assert.equal(typeof res, 'undefined');
					assert.equal(typeof err, 'object');

					done();
				});
			});
		});
	});

});
