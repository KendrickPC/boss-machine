# Developer Notes

### Server Boilerplate
In server.js, you will see some boilerplate code, but the server is missing key functionality to allow it to run. You must:

1. Set up body-parsing middleware with the body-parser package.

[Body Parsing Middleware Documentation](http://expressjs.com/en/resources/middleware/body-parser.html)

Inside terminal, in the project root folder directory (mines is boss-machine):

```console
boss-machine % npm install body-parser
```

In server.js file, on the top: 
```javascript
const express = require('express');
const app = express();
var bodyParser = require('body-parser')

// Add middware for parsing request bodies here:

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

2. Set up CORS middleware with the cors package. You can use the default settings.

[Cors Documentation for ALL requests and for single route](http://expressjs.com/en/resources/middleware/cors.html)
 
```console
npm install cors
```

```javascript
var cors = require('cors')
module.exports = app;
// Using the default settings
app.use(cors());
```


3. Mount the existing apiRouter at /api. This router will serve as the starting point for all your API routes.
[Express Routing Documentation](https://expressjs.com/en/guide/routing.html)

```javascript
// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
// ...
app.use('/api', apiRouter);
```

4. Start the server listening on the provided PORT. Make sure to use the PORT constant and not a hard-coded number, as this is required for tests to run.

[app.listen documentation in Express](https://expressjs.com/en/starter/hello-world.html)

```javascript
// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is now listening at http://localhost:${PORT}`);
  })
}
```

5. Take note of the comments in server.js, as your code needs to fit into specific places around the existing boilerplate.


### API Routes
1. Your routes should live inside the server folder. The file and router structure is up to you, the testing suite will only test whether your API endpoints work as intended, not how you nest your code!

Inside api.js
```javascript

const minionsRouter;
const ideasRouter;
const meetingsRouter;

```

2. Your 'database' exists in server/db.js. The beginning database will be seeded every time the server is restarted. There is more information on working with the database and the helper functions it exports below.


# Routes Required

## - `/api/minions`
- GET /api/minions to get an array of all minions.

Inside minions.js located inside the server folder:

```javascript
const minionsRouter = require('express').Router();
module.exports = minionsRouter;

const {getAllFromDatabase} = require('./db');

minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
})
```

- POST /api/minions to create a new minion and save it to the database.
- POST request bodies will not have an `id` property, you will have to set it based on the next id in sequence.
- For all `/api/minions` and `/api/ideas routes`, any POST or PUT requests will send their new/updated resources in the request body. 
Inside of minions.js located inside the server folder:

```javascript
const {addToDatabase} = require('./db');

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
})
```

- GET /api/minions/:minionId to get a single minion by id.

```javascript
const {getFromDatabaseById} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

```
- PUT /api/minions/:minionId to update a single minion by id.
- For all `/api/minions` and `/api/ideas routes`, any POST or PUT requests will send their new/updated resources in the request body. 
```javascript
const {updatedInstanceInDatabase} = require('./db');

minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinionInstance);
})
```

- DELETE /api/minions/:minionId to delete a single minion by id.

```javascript
const {deleteFromDatabasebyId} = require('./db');

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedMinionInstance = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinionInstance) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
})
```

## - `/api/ideas`
Inside api.js, update the following to match minions router.
```javascript
const ideasRouter = require('./ideas');

apiRouter.use('./ideas', ideasRouter);
```

Inside ideas.js:
```javascript
// ideas.js
const ideasRouter = require('./ideas');
module.exports = ideasRouter;
```

- GET /api/ideas to get an array of all ideas.
```javascript
const {
  getAllFromDatabase,
} = require('./db');

ideasRouter.get('/', (req, res, next) => {
  const allIdeas = getAllFromDatabase('ideas');
  res.send(allIdeas);
})
```

- POST /api/ideas to create a new idea and save it to the database.
- POST request bodies will not have an `id` property, you will have to set it based on the next id in sequence.
- For all `/api/minions` and `/api/ideas routes`, any POST or PUT requests will send their new/updated resources in the request body. 
```javascript
const {addToDatabase} = require('./db')

ideasRouter.post('/', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.send(newIdea);
})
```

- GET /api/ideas/:ideaId to get a single idea by id.

```javascript
const {getFromDatabaseById} = require('./db')

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('idea', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
})


ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
})
```

- PUT /api/ideas/:ideaId to update a single idea by id.
- For all `/api/minions` and `/api/ideas routes`, any POST or PUT requests will send their new/updated resources in the request body. 
```javascript
const {updateInstanceInDatabase} = require('./db')

ideasRouter.put('/:ideaId', (req, res, next) => {
  const updatedIdeaInstance = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdeaInstance);
})
```

- DELETE /api/ideas/:ideaId to delete a single idea by id.
```javascript
const {deleteFromDatabasebyId} = require('./db')

ideasRouter.delete('/ideaId', (req, res, next) => {
  const deletedIdeaInstance = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedIdeaInstance === true) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
})
```

## - `/api/meetings`
- GET /api/meetings to get an array of all meetings.
```javascript
const {getAllFromDatabase} = require('./db');

meetingsRouter.get('/', (req, res, next) => {
  const allMeetings = getAllFromDatabase('meetings');
  res.send(allMeetings);
})
```

- POST /api/meetings to create a new meeting and save it to the database.
- For `/api/meetings` POST route, no request body is necessary, as meetings are generated automatically by the server upon request. Use the provided `createMeeting` function exported from **db.js** to create a new meeting object.

```javascript
const { addToDatabase, createMeeting } = require('./db');

meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = addToDatabase('meetings', createMeeting())
  res.status(201).send(newMeeting);
})
```

- DELETE /api/meetings to delete _all_ meetings from the database.

```javascript
const {deleteAllFromDatabase} = require('./db');

meetingsRouter.delete('/', (req, res, next) => {
  const meetingKillSwitch = deleteAllFromDatabase('meetings');
  res.status(204).send(meetingKillSwitch);
})
```






[How to use Param function in Router](https://www.tabnine.com/code/javascript/functions/express/Router/param)