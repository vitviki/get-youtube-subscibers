const express = require("express");
const app = express();

// Your code goes here
app.use(express.json());
const Subscribers = require("./models/subscribers.js");

// Get all Subscribers
app.get("/subscribers", async (req, res) => {
  try {
    const subscribers = await Subscribers.find();
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all subscribers by name.
app.get("/subscribers/names", async (req, res) => {
  try {
    const subscribers = await Subscribers.find().select(
      "name subscribedChannel -_id"
    );
    if (!subscribers)
      return res.status(400).json({ error: "Database is currently empty" });

    res.status(200).json(subscribers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a subscriber by ID.
app.get("/subscribers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscribers.findById(id);

    if (!subscriber)
      return res.status(400).json({ error: "No such subscriber found" });

    res.status(200).json(subscriber);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a subscriber
app.post("/subscribers/add", async (req, res) => {
  try {
    const subscriber = await Subscribers.create(req.body);
    res.status(200).json(subscriber);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});

// Delete a subscriber
app.delete("/subscribers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const subscriber = await Subscribers.findByIdAndDelete(id);

    if (!subscriber)
      return res
        .status(401)
        .json({ error: "Resource not found or has already been deleted." });

    res.status(200).json(subscriber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
