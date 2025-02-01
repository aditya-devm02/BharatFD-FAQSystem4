const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB connected...');
    mongoose.set('debug', true);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.error('Error code:', err.code);
    console.error('Error message:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;