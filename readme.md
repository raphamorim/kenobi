# Kenobi

> Render external objects and array in view engines

[![NPM Version](https://img.shields.io/npm/v/express.svg?style=flat)](https://www.npmjs.org/package/kenobi)
[![Build Status](https://api.travis-ci.org/raphamorim/kenobi.svg)](https://travis-ci.org/raphamorim/kenobi)

## Install

	npm install kenobi

## How it works

In this example we are using the product hunter's API.

The options variable sets the request.

	var options = {
    	url: "https://api.producthunt.com/v1/posts",
    	auth: {
      		bearer: "XXXXXXX"
    	},
    	headers: {
        	'User-Agent': 'request'
    	},
 		method: "GET",
    	json: true,
    	timeout: 10000
  	};

After it is sent as the first parameter, after is set the page view path.

  	kenobi(options, '/views/index.ejs', function(page){
  		res.end(page); // Response
  	});

So, then we can treat the object in view. Then a global object is returned. Accessed by the name of **body**. See how it happens in ejs example:

	<body>

	<% if (body.posts.length) { %>
		<ul>
			<% body.posts.forEach(function(post){ %>
				<li><%= post.name %></li>
			<% }) %>
		</ul>
	<% } %>

	</body>

## Get response without view

For return only response object:

	kenobi(options, function(page){
  		res.send(page);
  	});

## Callback

page `String` = result of rendering

response `Object` = response from request

  	kenobi(options, function(page, response){
      		console.log("Response: " + response);
      		res.send(page);
  	});

In Response Object, you can get some data like statusCode, request body...

## Other examples

**Ejs:**

	<% body.posts.forEach(function(post){ %>
		<li><%= post.name %></li>
	<% }) %>

**Jade:**

	each post in body.posts
    	li= post.name


## Request params

The first argument can be either a `url` or an object. The only required option is `uri`, all others are optional.

- `uri` || `url` - fully qualified uri or a parsed url object from `url.parse()`

- `qs` - object containing querystring values to be appended to the `uri`

- `method` - http method (default: `"GET"`)

- `headers` - http headers (default: `{}`)

- `body` - entity body for PATCH, POST and PUT requests. Must be a `Buffer` or `String`.

- `form` - when passed an object or a querystring, this sets `body` to a querystring representation of value, and adds `Content-type: application/x-www-form-urlencoded; charset=utf-8` header. When passed no options, a `FormData` instance is returned (and is piped to request).

- `auth` - A hash containing values `user` || `username`, `pass` || `password`, and `sendImmediately` (optional).  See documentation above.

- `json` - sets `body` but to JSON representation of value and adds `Content-type: application/json` header.  Additionally, parses the response body as JSON.

- `multipart` - (experimental) array of objects which contains their own headers and `body` attribute. Sends `multipart/related` request. See example below.

- `followRedirect` - follow HTTP 3xx responses as redirects (default: `true`). This property can also be implemented as function which gets `response` object as a single argument and should return `true` if redirects should continue or `false` otherwise.

- `followAllRedirects` - follow non-GET HTTP 3xx responses as redirects (default: `false`).

- `maxRedirects` - the maximum number of redirects to follow (default: `10`).

- `encoding` - Encoding to be used on `setEncoding` of response data. If `null`, the `body` is returned as a `Buffer`.

- `timeout` - Integer containing the number of milliseconds to wait for a request to respond before aborting the request.

- `proxy` - An HTTP proxy to be used. Supports proxy Auth with Basic Auth, identical to support for the `url` parameter (by embedding the auth info in the `uri`).

- `oauth` - Options for OAuth HMAC-SHA1 signing. See documentation above.

- `aws` - `object` containing AWS signing information. Should have the properties `key`, `secret`. Also requires the property `bucket`, unless you’re specifying your `bucket` as part of the path, or the request doesn’t use a bucket (i.e. GET Services)


## View engines

- [Ejs](https://github.com/visionmedia/ejs)
- [Jade](https://github.com/visionmedia/jade)

## History

See [Changelog](docs/changelog.md) for more details.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT License © [Raphael Amorim](https://github.com/raphamorim)
