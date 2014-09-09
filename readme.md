# Kenobi

> Render external objects and array in view engines

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

## Other examples

**Ejs:**

	<% body.posts.forEach(function(post){ %>
		<li><%= post.name %></li>
	<% }) %>

**Jade:**

	each post in body.posts
    	li= post.name

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
