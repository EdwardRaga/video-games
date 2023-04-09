const {Platform} = require("../db");

async function getPlaforms(req, res) {
  try {
    const platforms = await Platform.findAll();
    res.status(201).json(platforms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = getPlaforms;
