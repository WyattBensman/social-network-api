const { connect, connection } = require("mongoose");

// DB Name goes at the end ------->
connect("mongodb://127.0.0.1:27017/socialNetworkDB");

module.exports = connection;
