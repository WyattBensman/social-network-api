const Thought = require("../models/thought");
const User = require("../models/user");

module.exports = {
  // Get All Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get Single Thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create New Thought
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thoughts._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "Post created, but found no user with that ID" });
      }

      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update Thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete Thought
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findByIdAndDelete(
        req.params.thoughtId
      );

      if (!deletedThought) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      // Remove the thought from the user's thought array
      const user = await User.findOneAndUpdate(
        { _id: deletedThought.thoughtId },
        { $pull: { thoughts: deletedThought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create Reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove Reaction
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
