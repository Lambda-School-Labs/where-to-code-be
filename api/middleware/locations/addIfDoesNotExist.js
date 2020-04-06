const LOCATIONS = require('../../models/LocationsModel');

module.exports = addIfDoesNotExist;

/*
  If location is not found, using findLocation, and provided id
  is above 10 characters, then we assume it is a googleId
  and add it to our database. The added location then gets passed
  into res.locals.location
*/

async function addIfDoesNotExist(req, res, next) {
  if (!!res.locals.location) return next();
  if (req.params.id.length < 10) return next();
  const [loc] = await LOCATIONS.addLocation({ googleId: req.params.id });
  res.locals.location = loc;
  next();
}