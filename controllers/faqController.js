const faqService = require("../services/faqService");

exports.createFAQ = async (req, res, next) => {
  try {
    const { question, answer } = req.body;
    const newFaq = await faqService.createFAQ(question, answer);
    res.status(201).json(newFaq);
  } catch (error) {
    next(error);
  }
};

exports.getFAQs = async (req, res, next) => {
  try {
    const lang = req.query.lang || "en";
    const faqs = await faqService.getFAQs(lang);
    res.json(faqs);
  } catch (error) {
    next(error);
  }
};