const express = require("express");
const router = express.Router();
const thoughtController = require("../controllers/thoughtController");

// Get all thoughts
router.get("/api/thoughts", thoughtController.getThoughts);

// Get single thought
router.get("/api/thoughts/:thoughtId", thoughtController.getSingleThought);

// Create thought
router.post("/api/thoughts", thoughtController.createThought);

// Update thought
router.put("/api/thoughts/:thoughtId", thoughtController.updateThought);

// Delete thought
router.delete("/api/thoughts/:thoughtId", thoughtController.deleteThought);

// Create reaction for thought
router.post(
  "/api/thoughts/:thoughtId/reactions",
  thoughtController.createReaction
);

// Delete reaction from thought
router.delete(
  "/api/thoughts/:thoughtId/reactions/:reactionId",
  thoughtController.removeReaction
);

module.exports = router;
