const mongoose = require("mongoose");
const User = require("../models/user");
const Thought = require("../models/thought");
const Reaction = require("../models/reaction");
const faker = require("faker");

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost/socialNetworkDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Helper function to generate random user data
const generateUserData = () => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
  };
};

// Helper function to generate random thought data
const generateThoughtData = (userId) => {
  return {
    thoughtText: faker.lorem.sentence(),
    username: faker.internet.userName(),
    userId: userId,
  };
};

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    await Reaction.deleteMany({});

    // Create users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const userData = generateUserData();
      const user = await User.create(userData);
      users.push(user);
    }

    // Create thoughts and reactions
    for (const user of users) {
      for (let i = 0; i < 3; i++) {
        const thoughtData = generateThoughtData(user._id);
        const thought = await Thought.create(thoughtData);

        for (let j = 0; j < 2; j++) {
          const reaction = new Reaction({
            reactionBody: faker.lorem.words(),
            username: faker.internet.userName(),
            thoughtId: thought._id,
          });
          await reaction.save();
          thought.reactions.push(reaction);
        }

        user.thoughts.push(thought);
        await user.save();
      }
    }

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    // Close the connection when done
    mongoose.disconnect();
  }
};

// Run the seed function
seedDatabase();
