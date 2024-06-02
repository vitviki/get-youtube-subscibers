const mongoose = require("mongoose");
const subscriberModel = require("./models/subscribers");
require("dotenv").config();
const data = require("./data");

// Connect to DATABASE
const DATABASE_URL = process.env.MONGODB_URL;
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Database created..."));

const refreshAll = async () => {
  await subscriberModel.deleteMany({});
  // console.log(connection)
  await subscriberModel.insertMany(data);
  await mongoose.disconnect();
};
refreshAll();
