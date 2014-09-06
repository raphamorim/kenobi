## Kenobi

> Work with objects in view engines

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
    	json: true,
    	timeout: 10000
  	};

After it is sent as the first parameter, after is set the page view path.

  	kenobi(options, '/views/index.ejs', function(page){
  		res.end(page); // Response
  	});

So, then we can treat the object in view. Then a global object is returned. Accessed by the name of **body**. See how it happens in ejs example.

	<body>

	<% if (body.posts.length) { %>
		<ul>
			<% body.posts.forEach(function(post){ %>
				<li><%= post.name %></li>
			<% }) %>
		</ul>
	<% } %>

	</body>

## View engine suports

- Ejs
- Jade (next release)

