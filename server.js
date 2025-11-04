// File: server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // **Crucial for fixing the 405/CORS error**

// Assuming your routes file is correctly located at './routes/analytics.js'
const analyticsRoutes = require('./routes/analytics'); 
const app = express();

// --- Middleware Setup ---
// Order is important: must be before the routes are used
app.use(cors());              // 1. Allows your frontend (e.g., on port 5501) to talk to the backend (port 3001)
app.use(express.json());      // 2. Allows Express to read the JSON body of POST requests (analytics data)

// --- Routes Setup ---
// ✅ Mount with /api/analytics prefix
app.use('/api/analytics', analyticsRoutes);
   // Mount the analytics routes

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => console.log('🟢 MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- Server Startup ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));