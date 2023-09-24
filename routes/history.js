const express = require("express");
const { MinerAction } = require("../constants.js");
const History = require("../schemas/History")
const router = express.Router();
const { CODE } = require('../constants')


// get history
router.get("/history", async (req, res) => {

  try {
    const history = await History.find();
    res.json({ code: CODE.OK, data: history, message: 'success'});
  } catch (error) {
    return res.json({ code: CODE.EXCEPTION, data: null, message: error});
  }
 
});

// Get a single history by ID
router.get("/history/:id", async (req, res) => {

  try {
    const history = await History.findById(req.params.id);

    if (!history)
      return res
        .json({ code: CODE.DATA_NOT_EXIST, data: null, message: "history not found" });
    res.json({ code: CODE.OK, data: history, message: "success" });
  } catch (error) {
    return res
    .json({ code: CODE.EXCEPTION, data: null, message: error });
  }
 
});

// Create a new history
router.post("/history", async (req, res) => {
  const { action, planetId, asteroidId, costTime,} =  req.body;

  if (!action) {
    return res.json({code: CODE.PARAM_ERROR, data: null, message: 'params error'})
  }

  const actions = Object.values(MinerAction)
  
  if (!actions.includes(action)) {
    return res.json({code: CODE.PARAM_ERROR, data: null, message: 'action out of range'})
  }

  // TODO:  check params depends on action ?

  try {

    const history = new History({
      planetId,
      asteroidId,
      costTime,
      action,
      date: new Date()
    })

    await history.save();
    res.json({ code: CODE.OK, data: null, message: "success" });
  } catch (error) {
    res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

module.exports = router