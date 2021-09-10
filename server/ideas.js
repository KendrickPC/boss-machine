// ideas.js
const { getAllFromDatabase } = require('./db');
const ideasRouter = require('./ideas');
module.exports = ideasRouter;

ideasRouter.get('/ideas', (req, res, next) => {
  const allIdeas = getAllFromDatabase('ideas')
  res.send(allIdeas)
})
