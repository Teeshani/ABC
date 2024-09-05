// backend/routes/queryRoutes.js

const express = require('express');
const Query = require('../models/Query');
const router = express.Router();

// Submit a new query
router.post('/queries', async (req, res) => {
    try {
        const query = new Query(req.body);
        await query.save();
        res.status(201).json(query);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all queries
router.get('/queries', async (req, res) => {
    try {
        const queries = await Query.find();
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
