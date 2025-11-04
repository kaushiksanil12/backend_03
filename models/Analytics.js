// File: models/Analytics.js

const mongoose = require('mongoose');
const analyticsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    eventType: { type: String, required: true }, // e.g., 'painting_scanned', 'app_start'
    
    // These fields are required for your summary query
    paintingTitle: { type: String }, 
    paintingArtist: { type: String },
    
    // Other tracking details
    paintingId: { type: String },
    scanType: { type: String }, 
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Object } // For storing any extra detail
});

module.exports = mongoose.model('Analytics', analyticsSchema);