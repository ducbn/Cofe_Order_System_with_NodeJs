const express = require('express');
const router = express.Router();
const Bus = require('../models/Buses');

// Tìm tất cả chuyến xe theo điểm đi & điểm đến
router.post('/search', async (req, res) => {
  try {
    const buses = await Bus.find({
      startCity: req.body.startCity,
      destination: req.body.destination
    });
    res.json({ buses });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error while searching', error: err.message });
  }
});

// Tìm chuyến xe theo ID
router.post('/findById', async (req, res) => {
  try {
    const bus = await Bus.findById(req.body.bId);
    if (!bus) {
      return res.status(404).json({ status: false, message: 'Bus not found' });
    }
    res.json({ bus });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error while searching with ID', error: err.message });
  }
});

// Thêm mới chuyến xe
router.post('/create', async (req, res) => {
  try {
    const newBus = new Bus(req.body);
    const savedBus = await newBus.save();
    res.status(201).json(savedBus);
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error while saving bus', error: err.message });
  }
});

module.exports = router;
