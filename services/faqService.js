const faqRepository = require("../repositories/faqRepository");
const cacheService = require("./cacheService");
const { translateText } = require("./translationService");

class FAQService {
  async createFAQ(question, answer) {
    const translations = await Promise.all([
      translateText(question, "fr").then(trans => ({ lang: 'fr', question: trans })),
      translateText(question, "es").then(trans => ({ lang: 'es', question: trans })),
      translateText(answer, "fr").then(trans => ({ lang: 'fr', answer: trans })),
      translateText(answer, "es").then(trans => ({ lang: 'es', answer: trans }))
    ]);

    const translationObj = translations.reduce((acc, curr) => {
      if (!acc[curr.lang]) acc[curr.lang] = {};
      if (curr.question) acc[curr.lang].question = curr.question;
      if (curr.answer) acc[curr.lang].answer = curr.answer;
      return acc;
    }, {});

    const faqData = {
      question,
      answer,
      translations: translationObj
    };

    const newFaq = await faqRepository.create(faqData);
    await cacheService.delete("faqs_*");
    return newFaq;
  }

  async getFAQs(lang = "en") {
    const cachedData = await cacheService.get(`faqs_${lang}`);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const faqs = await faqRepository.findAll();
    const translatedFAQs = faqs.map((faq) => ({
      question: faq.translations[lang]?.question || faq.question,
      answer: faq.translations[lang]?.answer || faq.answer,
    }));

    await cacheService.set(`faqs_${lang}`, translatedFAQs);
    return translatedFAQs;
  }
}

module.exports = new FAQService();