# Developer Notes

### Server Boilerplate
In server.js, you will see some boilerplate code, but the server is missing key functionality to allow it to run. You must:

- Set up body-parsing middleware with the body-parser packagae.
[Body Parsing Middleware Documentation](http://expressjs.com/en/resources/middleware/body-parser.html)
Inside terminal, in the project root folder directory (mines is boss-machine): 
```console
boss-machine % npm install body-parser
```

In server.js file, on the top: 
```javascript

```


- Set up CORS middleware with the cors package. You can use the default settings.
- Mount the existing apiRouter at /api. This router will serve as the starting point for all your API routes.
- Start the server listening on the provided PORT. Make sure to use the PORT constant and not a hard-coded number, as this is required for tests to run.
- Take note of the comments in server.js, as your code needs to fit into specific places around the existing boilerplate.