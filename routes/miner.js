const express = require("express");
const { MinerStatus } = require("../constants");
const Miner = require("../schemas/Miner")
const router = express.Router();
const { CODE } = require('../constants')

// get miners
router.get("/miner", async (req, res) => {
  try {
    const { planetId } = req.query;
    let query = {};

    if (planetId) {
       query.planetId = planetId
    }

    const miners = await Miner.find(query);
    res.json({ code: CODE.OK, data: miners, message: "success"});
  } catch (error) {
    res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

// Get a single miner by ID
router.get("/miner/:id", async (req, res) => {
  const miners = await Miner.findById(req.params.id);
  if (!miners)
    return res.json({ code: CODE.PARAM_ERROR, data: null, message: "miner not found" });
  res.json({ code: CODE.OK, data: miners, message: "success" });
});

// Create a new miner
router.post("/miner", async (req, res) => {
  const { planetId, carryCapacity, travelSpeed, miningSpeed, position } =
    req.body;

  // check params
  if (!planetId || !carryCapacity || !travelSpeed || !miningSpeed || !position) {
    return res.json({ code: CODE.PARAM_ERROR, data: null, message: "params error" });
  }

  if (carryCapacity > 200 || carryCapacity < 1) {
    return res.json({ code: CODE.PARAM_ERROR, data: null, message: "carry capactiy out of range" });
  }

  if (travelSpeed > 200 || travelSpeed < 1) {
    return res.json({ code: CODE.PARAM_ERROR, data: null, message: "travel speed out of range" });
  }

  if (miningSpeed > 200 || miningSpeed < 1) {
    return res.json({ code: CODE.PARAM_ERROR, data: null, message: "mining speed out of range" });
  }

  // set default status
  const status = MinerStatus.Idle

  const miner = new Miner({
    planetId,
    carryCapacity,
    travelSpeed,
    miningSpeed,
    position,
    status,
  });

  try {
    await miner.save();
    return res.json({ code: CODE.OK, data: null, message: "success" });
  } catch (error) {
    return res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

router.put("/miner/:id", async (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;

  // TODO: [dylan] check params

  try {
    const miner = await Miner.findByIdAndUpdate(id, updatedItem, { new: true });
    if (!miner)
      return res.json({ code: CODE.DATA_NOT_EXIST, data: null, message: "miner not found" });
    res.json({ code: CODE.OK, data: miner, message: "success" });
  } catch (error) {
    res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

module.exports = router;
