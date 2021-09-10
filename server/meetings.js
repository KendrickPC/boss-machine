// meetings.js
const meetingsRouter = require('express').Router();
module.exports = meetingsRouter;

const {
  getAllFromDatabase,
  addToDatabase,
  createMeeting,
  deleteAllFromDatabase,
} = require('./db')

// - `/api/meetings`
//   - GET /api/meetings to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
})

//   - POST /api/meetings to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
  // 7) should create a new meetings and return it
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
})

//   - DELETE /api/meetings to delete _all_ meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
  const meetingKillSwitch = deleteAllFromDatabase('meetings');
  res.status(204).send(meetingKillSwitch);
})

