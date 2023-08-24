const { Schema, model } = require("mongoose");

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Need Getter Method
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  }
);

// Reaction Count Virtual
userSchema.virtual("reactionCount").get(() => {
  return this.reactions.length;
});

// Thought Model
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
