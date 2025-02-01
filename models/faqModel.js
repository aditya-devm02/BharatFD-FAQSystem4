const mongoose = require("mongoose");

// Enable Mongoose debugging
mongoose.set('debug', true);

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    fr: { question: String, answer: String },
    es: { question: String, answer: String },
  },
});

module.exports = mongoose.model("FAQ", FaqSchema);
