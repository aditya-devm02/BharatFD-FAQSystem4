const faqRepository = require('../repositories/faqRepository');
const cacheService = require('./cacheService');
const { translateText } = require('./translationService');

class FAQService {
  async createFAQ(question, answer) {
    try {
      // Generate translations
      const translations = {
        fr: {
          question: await translateText(question, 'fr'),
          answer: await translateText(answer, 'fr')
        },
        es: {
          question: await translateText(question, 'es'),
          answer: await translateText(answer, 'es')
        }
      };

      const faq = await faqRepository.create({
        question,
        answer,
        translations
      });

      // Clear cache after creating new FAQ
      await cacheService.delete('faqs_*');
      return faq;
    } catch (error) {
      throw error;
    }
  }

  async getFAQs(language = 'en') {
    try {
      // Try to get from cache first
      const cacheKey = `faqs_${language}`;
      const cachedFaqs = await cacheService.get(cacheKey);
      
      if (cachedFaqs) {
        return JSON.parse(cachedFaqs);
      }

      // If not in cache, get from database
      const faqs = await faqRepository.findAll();
      
      // Transform FAQs based on language
      const translatedFaqs = faqs.map(faq => {
        if (language === 'en') {
          return {
            id: faq._id,
            question: faq.question,
            answer: faq.answer
          };
        }

        const translation = faq.translations?.[language];
        return {
          id: faq._id,
          question: translation?.question || faq.question,
          answer: translation?.answer || faq.answer
        };
      });

      // Cache the results
      await cacheService.set(cacheKey, JSON.stringify(translatedFaqs), 3600);
      return translatedFaqs;
    } catch (error) {
      throw error;
    }
  }

  async updateFAQ(id, { question, answer }) {
    try {
      const translations = {
        fr: {
          question: await translateText(question, 'fr'),
          answer: await translateText(answer, 'fr')
        },
        es: {
          question: await translateText(question, 'es'),
          answer: await translateText(answer, 'es')
        }
      };

      const updatedFaq = await faqRepository.update(id, {
        question,
        answer,
        translations
      });

      if (!updatedFaq) {
        throw new Error('FAQ not found');
      }

      await cacheService.delete('faqs_*');
      return updatedFaq;
    } catch (error) {
      throw error;
    }
  }

  async deleteFAQ(id) {
    const result = await faqRepository.delete(id);
    if (!result) {
      throw new Error('FAQ not found');
    }
    await cacheService.delete('faqs_*');
    return result;
  }
}

module.exports = new FAQService();