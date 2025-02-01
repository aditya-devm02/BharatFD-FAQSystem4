import { jest } from '@jest/globals';
import FAQService from '../../services/faqService';
import faqRepository from '../../repositories/faqRepository';
import cacheService from '../../services/cacheService';
import { translateText } from '../../services/translationService';

jest.mock('../../repositories/faqRepository');
jest.mock('../../services/cacheService');
jest.mock('../../services/translationService');

describe('FAQService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createFAQ', () => {
    it('should create FAQ with translations', async () => {
      // Mock translation responses
      translateText.mockImplementation((text, lang) => 
        Promise.resolve(`${text} in ${lang}`)
      );

      const faqData = {
        question: 'Test question?',
        answer: 'Test answer'
      };

      faqRepository.create.mockResolvedValue({
        ...faqData,
        translations: {
          fr: {
            question: 'Test question? in fr',
            answer: 'Test answer in fr'
          },
          es: {
            question: 'Test question? in es',
            answer: 'Test answer in es'
          }
        }
      });

      const result = await FAQService.createFAQ(
        faqData.question,
        faqData.answer
      );

      expect(translateText).toHaveBeenCalledTimes(4);
      expect(faqRepository.create).toHaveBeenCalled();
      expect(cacheService.delete).toHaveBeenCalledWith('faqs_*');
      expect(result.translations).toBeDefined();
    });
  });

  describe('getFAQs', () => {
    it('should return cached FAQs if available', async () => {
      const cachedFaqs = [{ question: 'Cached?', answer: 'Yes' }];
      cacheService.get.mockResolvedValue(JSON.stringify(cachedFaqs));

      const result = await FAQService.getFAQs('en');

      expect(cacheService.get).toHaveBeenCalledWith('faqs_en');
      expect(faqRepository.findAll).not.toHaveBeenCalled();
      expect(result).toEqual(cachedFaqs);
    });

    it('should fetch and cache FAQs if not cached', async () => {
      cacheService.get.mockResolvedValue(null);
      const dbFaqs = [{
        question: 'Test?',
        answer: 'Yes',
        translations: {
          fr: { question: 'Test FR?', answer: 'Oui' }
        }
      }];

      faqRepository.findAll.mockResolvedValue(dbFaqs);

      const result = await FAQService.getFAQs('fr');

      expect(faqRepository.findAll).toHaveBeenCalled();
      expect(cacheService.set).toHaveBeenCalled();
      expect(result[0].question).toBe('Test FR?');
    });
  });
}); 