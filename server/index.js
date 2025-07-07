// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (always before routes)
/* This tells Express: “Hey, all routes inside auth.js are prefixed with /api/auth */
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.raw({ type: '*/*', limit: '50mb' }));

// ✅ Import routes + Mount routes (always after middleware)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const resultRoutes = require('./routes/results');
app.use('/api/results', resultRoutes);

// ✅ Test API routes (ping/download/upload)
app.get('/api/ping', (req, res) => {
  const start = Date.now();
  setTimeout(() => {
    const latency = Date.now() - start;
    res.json({ latency });
  }, 10);
});

app.get('/api/download', (req, res) => {
  const data = Buffer.alloc(5 * 1024 * 1024); // 5MB dummy data
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(data);
});

app.post('/api/upload', (req, res) => {
  const size = req.body.length;
  res.json({ uploadedSize: size });
});

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
