// This file defines the Mongoose schema/model used to save speed test results in MongoDB

// 1️⃣ Import Mongoose to define schema and interact with MongoDB
const mongoose = require('mongoose');

// 2️⃣ Create a new schema (i.e., structure of a document in MongoDB)
const speedResultSchema = new mongoose.Schema({
  
  // User ID who performed the test (optional for now; useful once login/signup is added)
  userId: {
    type: String,
    required: false
  },

  // Speed test result fields:
  
  // 3️⃣ Download speed in Mbps
  downloadSpeed: Number,

  // 4️⃣ Upload speed in Mbps
  uploadSpeed: Number,

  // 5️⃣ Ping in milliseconds
  ping: Number,

  // 6️⃣ Timestamp of when the test was taken (automatically set to current time)
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 7️⃣ Export the model so it can be used in route handlers (e.g., to save or fetch data)
module.exports = mongoose.model('SpeedResult', speedResultSchema);
