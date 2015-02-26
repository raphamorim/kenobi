var kenobi = require('../kenobi'),
	nock   = require('nock'),
	fs = require('fs'),
	assert = require('assert');

var html = __dirname + '/templates/sample.html';

// TODO: test ejs, jade, html render

describe('Templates', function() {
	context('EJS', function() {
		context('Send (valid request, ejs file path)', function() {
			it('should get rendered ejs template', function(done) {
				var url = 'http://test.com',
					obj = {'name': 'Kenobi'},
					template = '/test/templates/template.ejs',
					api = nock(url)
						  .get('/')
						  .reply(200, obj);

				kenobi(url, template, function(page, res, err){
					assert.equal(res.statusCode, 200);
					assert.equal(typeof res, 'object');
					assert.equal(err, null);

					fs.readFile(html, 'utf8', function(err, expected){
						if (err) assert.equal(err, null);
						assert.equal(expected, page);

						done();
					});
				});
			});
		});
		context('Send (local object, ejs file path)', function() {
			it('should get rendered ejs template', function(done) {
				var obj = {name: 'Kenobi', request: false},
					template = '/test/templates/template.ejs';

				kenobi(obj, template, function(page, res, err){
					assert.equal(res, null);
					assert.equal(err, null);

					fs.readFile(html, 'utf8', function(err, expected){
						if (err) assert.equal(err, null);
						assert.equal(expected, page);

						done();
					});
				});
			});
		});
	});
	context('JADE', function() {
		context('Send (valid request, jade file path)', function() {
			it('should get rendered jade template', function(done) {
				var url = 'http://test.com',
					obj = {'name': 'Kenobi'},
					template = '/test/templates/template.jade',
					api = nock(url)
						  .get('/')
						  .reply(200, obj);

				kenobi(url, template, function(page, res, err){
					assert.equal(res.statusCode, 200);
					assert.equal(typeof res, 'object');
					assert.equal(err, null);

					fs.readFile(html, 'utf8', function(err, expected){
						if (err) assert.equal(err, null);
						assert.equal(
							page.replace(/\s+/g, ''),
							expected.replace(/\s+/g, '')
						);

						done();
					});
				});
			});
		});
		context('Send (local object, jade file path)', function() {
			it('should get rendered jade template', function(done) {
				var obj = {name: 'Kenobi', request: false},
					template = '/test/templates/template.jade';

				kenobi(obj, template, function(page, res, err){
					assert.equal(res, null);
					assert.equal(err, null);

					fs.readFile(html, 'utf8', function(err, expected){
						if (err) assert.equal(err, null);
						assert.equal(
							page.replace(/\s+/g, ''),
							expected.replace(/\s+/g, '')
						);

						done();
					});
				});
			});
		});
	});
    context('HTML', function() {
    	context('Send (valid request, html file path)', function() {
			it('should get rendered html template', function(done) {
				var url = 'http://test.com',
					obj = {'name': 'Kenobi'},
					template = '/test/templates/template.html';
					api = nock(url)
						  .get('/')
						  .reply(200, obj);

				kenobi(url, template, function(page, res, err){
					assert.equal(res.statusCode, 200);
					assert.equal(typeof res, 'object');
					assert.equal(err, null);

					fs.readFile(html, 'utf8', function(err, expected){
						if (err) assert.equal(err, null);
						assert.equal(
							page.replace(/\s+/g, ''),
							expected.replace(/\s+/g, '')
						);

						done();
					});
				});
			});
		});
		context('Send (local object, html file path)', function() {
			it('should get rendered html template', function(done) {
				var obj = {name: 'Kenobi', request: false},
					template = '/test/templates/template.html';

				kenobi(obj, template, function(page, res, err){
					assert.equal(res, null);
                    assert.equal(err, null);

					fs.readFile(html, 'utf8', function(err, expected){
						if (err) assert.equal(err, null);
						assert.equal(
							page.replace(/\s+/g, ''),
							expected.replace(/\s+/g, '')
						);

						done();
					});
				});
			});
		});
	});
});
