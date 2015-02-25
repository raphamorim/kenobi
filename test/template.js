var kenobi = require('../kenobi'),
	nock   = require('nock'),
	fs = require('fs'),
	assert = require('assert');

var html = __dirname + '/templates/sample.html';

// TODO: test ejs, jade, html render

describe('Templates', function() {
	context('EJS', function() {
		context('Send valid request and ejs file', function() {
			it('should get rendered ejs template', function(done) {
				var url = 'http://test.com',
					obj = {'name': 'Kenobi'},
					template = '/test/templates/sample.ejs',
					api = nock(url)
						  .get('/')
						  .reply(200, obj);

				kenobi(url, template, function(page, res, err){
					assert.equal(res.statusCode, 200);
					assert.equal(typeof res, 'object');
					assert.equal(err, null);

					fs.readFile(html, 'utf8', function(err, data){
						if (err) assert.equal(err, null);
						assert.equal(data, page);

						done();
					});
				});
			});
		});
	});
});
