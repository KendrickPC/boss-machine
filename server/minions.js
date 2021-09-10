// minions.js
const minionsRouter = require('express').Router();
module.exports = minionsRouter;

const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

// - GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
})

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  const updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinionInstance);
})

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deletedMinionInstance =  deleteFromDatabasebyId('minions', req.params.minionId);
  if (deletedMinionInstance) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
})






