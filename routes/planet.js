const express = require("express");
const router = express.Router();
const Planet = require('../schemas/Planet')
const { CODE } = require('../constants')

/**
 * @swagger
 * /api/planet/{id}:
 *   get:
 *     summary: Get a planet by ID
 *     tags: [Planets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: Planet ID
 *     responses:
 *       200:
 *         description: Successfully retrieved a planet by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#./schemas/Planet'
 *       404:
 *         description: Planet not found
 */
router.get("/planet", async (req, res) => {
  const { id } = req.query;
  
  let query = {}
  if (id) {
    query._id = id
  }

  try {
    const planets = await Planet.find(query);
    res.json({ code: CODE.OK, data: planets, message: "success" });
  } catch (error) {
    res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});


router.get("/planet/:id", async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet)
      return res.json({ code: CODE.DATA_NOT_EXIST, data: null, message: "planet not found" });
    res.json({ code: CODE.OK, data: planet, message: "success" });
  } catch (error) {
    return res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

// Create a new planet
router.post("/planet", async (req, res) => {
  try {
    const { name, mineralNum, position } = req.body;

    if (!name || !mineralNum || !position) {
      return res.json({ code: CODE.PARAM_ERROR, data: null, message: "params error" });
    }

    if (!position.x || !position.y) {
      return res.json({ code: CODE.PARAM_ERROR, data: null, message: "params position error" });
    }

    const planet = new Planet({ name, mineralNum, position });

    await planet.save();
    return res.json({ code: CODE.OK, data: null, message: "success" });
  } catch (error) {
    return res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

router.put("/planet/:id", async (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;

  try {
    const planet = await Planet.findByIdAndUpdate(id, updatedItem, {
      new: true,
    });
    if (!planet)
      return res.json({ code: 1, data: null, message: "planet not found" });
    res.json({ code: CODE.OK, data: planet, message: "success" });
  } catch (error) {
    res.json({ code: CODE.EXCEPTION, data: null, message: error });
  }
});

module.exports = router;
