const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Get all users
router.get("/api/users", userController.getUsers);

// Get single user
router.get("/api/users/:userId", userController.getSingleUser);

// Create user
router.post("/api/users", userController.createUser);

// Update user
router.put("/api/users/:userId", userController.updateUser);

// Delete user
router.delete("/api/users/:userId", userController.deleteUser);

// Add friend to user's friend list
router.post("/api/users/:userId/friends/:friendId", userController.addFriend);

// Remove friend from user's friend list
router.delete(
  "/api/users/:userId/friends/:friendId",
  userController.removeFriend
);

module.exports = router;
