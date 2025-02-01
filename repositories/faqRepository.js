const FAQ = require("../models/faqModel");

class FAQRepository {
  async create(faqData) {
    const newFaq = new FAQ(faqData);
    return await newFaq.save();
  }

  async findAll() {
    return await FAQ.find({});
  }

  async findById(id) {
    return await FAQ.findById(id);
  }

  async update(id, faqData) {
    return await FAQ.findByIdAndUpdate(id, faqData, { new: true });
  }

  async delete(id) {
    return await FAQ.findByIdAndDelete(id);
  }
}

module.exports = new FAQRepository();