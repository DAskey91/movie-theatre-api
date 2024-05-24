const express = require("express");
const { User, Show } = require("../models");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// GET request to return all Users
router.get("/", async (request, response) => {
  const users = await User.findAll();
  response.json(users);
});

// GET request to return one user from their id
router.get("/:id", async (request, response) => {
  const user = await User.findByPk(request.params.id);
  response.json(user);
});

// GET all shows watched by a user (user id in req.params)
router.get("/:id/shows/watched", async (request, response) => {
  const user = await User.findByPk(request.params.id, {include: {
    model: Show,
    through: {attributes:[]}
  }});
  response.json(user)
});

// PUT associate a user with a show they have watched
router.put("/:id/shows/:showId", async (request, response) => {
  const user = await User.findByPk(request.params.id);
  const show = await Show.findByPk(request.params.showId);
  await user.addShow(show);
  response.send("show updated!");
});

module.exports = router;
