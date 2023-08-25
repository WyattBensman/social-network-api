const express = require("express");
const db = require("./config/connection");
const { userRoutes, thoughtRoutes } = require("./routes");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(userRoutes);
app.use(thoughtRoutes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
