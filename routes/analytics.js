const express = require('express');
const Analytics = require('../models/Analytics');
const router = express.Router();

// ✅ CORRECT: Use relative path (mounted at /api/analytics)
router.post('/', async (req, res) => {
    try {
        const event = await Analytics.create({
            userId: req.body.userId,
            eventType: req.body.event,
            paintingTitle: req.body.details?.artworkTitle,
            paintingArtist: req.body.details?.artworkArtist,
            paintingId: req.body.details?.artworkId,
            scanType: req.body.details?.scanType,
            userAgent: req.body.userAgent,
            metadata: req.body.details
        });
        res.status(201).json({ success: true, message: 'Event logged.' });
    } catch (error) {
        console.error('Analytics POST failed:', error.message);
        res.status(200).json({ success: false, message: 'Log failed internally' });
    }
});

router.get('/summary', async (req, res) => {
    try {
        const mostScannedPaintings = await Analytics.aggregate([
            { $match: { eventType: 'scan_success' } },
            { $group: { _id: '$paintingTitle', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        res.json({ mostScannedPaintings });
    } catch (error) {
        console.error('Analytics Summary GET failed:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
