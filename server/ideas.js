// ideas.js
const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea')
module.exports = ideasRouter;

const { 
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
})

ideasRouter.get('/', (req, res, next) => {
  const allIdeas = getAllFromDatabase('ideas')
  res.send(allIdeas)
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea)
});

ideasRouter.put('/:ideaId', (req, res, id) => {
  const updatedIdeasInstance = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdeasInstance);
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deletedIdeaInstance = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deletedIdeaInstance) {
    res.status(204)
  } else {
    res.status(500);
  }
  res.send();
})
