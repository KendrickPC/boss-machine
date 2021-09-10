const express = require('express');
const apiRouter = express.Router();

// setting up router structure
// routes required are minions, ideas, and meetings
// '/api/minions'
// '/api/ideas'
// '/api/meetings'

const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
// const meetingsRouter;

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
// apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
