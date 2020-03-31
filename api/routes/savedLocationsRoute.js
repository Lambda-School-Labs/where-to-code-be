const router = require("express").Router();
const SAVED = require("../models/SavedLocationsModel");

const authenticate = require("../middleware/authenticate.js");
const findLocation = require("../middleware/locations/findLocation");

router.use(authenticate);

// @route  GET /locations/saved/
// @desc   Retrieve a users saved locations
// @access Basic Users
router.get("/", async (req, res) => {
  const userId = res.locals.decodedToken.userId;
  const locations = await SAVED.getSavedLocations(userId);
  locations.length ? res.status(200).json(locations) : res.status(204).end();
});

// @route  POST /locations/saved/:locationId
// @desc   Add a location to users saved locations
// @access Basic Users
router.post("/:id", findLocation, async (req, res) => {
  const userId = res.locals.decodedToken.userId;
  const locationId = res.locals.location.id;
  const success = await SAVED.addSavedLocation(userId, locationId);
  !!success ? res.status(204).end() : res.status(400).end();
});

// @route  DELETE /locations/saved/:locationId
// @desc   Remove a location from users saved list
// @access Basic Users
router.delete("/:id", findLocation, async (req, res) => {
  const userId = res.locals.decodedToken.userId;
  const locationId = res.locals.location.id;
  const success = await SAVED.removeSavedLocation(userId, locationId);
  !!success ? res.status(204).end() : res.status(400).end();
});

module.exports = router;