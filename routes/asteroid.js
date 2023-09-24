const express = require("express");
const Asteroid = require("../schemas/Asteroid")
const router = express.Router();
const { CODE } = require('../constants')

// get asteroids
router.get("/asteroid", async (req, res) => {

  try {
    const asteroids = await Asteroid.find();
    res.json({ code: CODE.OK, data: asteroids, message: 'success'});
  } catch (error) {
    return res.json({ code: CODE.EXCEPTION, data: null, message: error});
  }
 
});

// Get a single asteroid by ID
router.get("/asteroid/:id", async (req, res) => {

  try {
    const asteroids = await Asteroid.findById(req.params.id);

    if (!asteroids)
      return res
        .json({ code: CODE.DATA_NOT_EXIST, data: null, message: "asteroid not found" });
    res.json({ code: CODE.OK, data: asteroids, message: "success" });
  } catch (error) {
    return res
    .json({ code: CODE.EXCEPTION, data: null, message: error });
  }
 
});

// Create a new asteroid
router.post("/asteroid", async (req, res) => {
  const { name, position, mineralsNum, } =  req.body;

  if (!name || !position || !mineralsNum) {
    return res.json({code: CODE.PARAM_ERROR, data: null, message: 'params error'})
  }

  if (mineralsNum < 800 || mineralsNum > 1200) {
    return res.json({code: CODE.PARAM_ERROR, data: null, message: 'mineralsNum out of range'})
  }

  // must have minerals , so default 1
  const status = 1

  const asteroid = new Asteroid({ name, position, status, mineralsNum });

  try {
    await asteroid.save();
    res.json({ code: CODE.OK, data: null, message: "success" });
  } catch (error) {
    res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

router.put("/asteroid/:id", async (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;

  // TODO: check params

  // update status
  if (updatedItem.mineralsNum <= 0) {
    updatedItem.status = 0
  } else {
    updatedItem.status = 1
  }

  try {
    const asteroid = await Asteroid.findByIdAndUpdate(id, updatedItem, { new: true });
    if (!asteroid)
      return res
        .json({ code: CODE.DATA_NOT_EXIST, data: null, message: "asteroid not found" });
    res.json({ code: CODE.OK, data: asteroid, message: "success" });
  } catch (error) {
    res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

module.exports = router