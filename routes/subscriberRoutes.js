const express = require("express");
const Subscriber = require("../models/Subscriber");
const router = express.Router();

router.post("/", async (req, res) => {
  const sub = await Subscriber.create(req.body);
  res.json(sub);
});

router.get("/", async (req, res) => {
  const subs = await Subscriber.find();
  res.json(subs);
});

module.exports = router;
