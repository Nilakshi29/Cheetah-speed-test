// server/routes/results.js
const express = require('express');
const router = express.Router();
const SpeedResult = require('../models/SpeedResult');

// POST /api/results → Save a speed test result
router.post('/', async (req, res) => {
  try {
    const { downloadSpeed, uploadSpeed, ping, userId } = req.body;

    const result = new SpeedResult({
      downloadSpeed,
      uploadSpeed,
      ping,
      userId, // optional for now
    });

    const saved = await result.save();
    res.status(201).json({ message: 'Result saved', resultId: saved._id });
  } catch (err) {
    console.error('❌ Error saving result:', err);
    res.status(500).json({ error: 'Server error while saving result' });
  }
});

// GET /api/results → Get all results (you can limit by userId later)
router.get('/', async (req, res) => {
  try {
    const results = await SpeedResult.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Error fetching results:', err);
    res.status(500).json({ error: 'Server error while fetching results' });
  }
});

module.exports = router;
