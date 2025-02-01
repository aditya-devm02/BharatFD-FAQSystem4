const faqService = require('../../services/faqService');
const faqRepository = require('../../repositories/faqRepository');
const cacheService = require('../../services/cacheService');
const { translateText } = require('../../services/translationService');

// Mock the dependencies
jest.mock('../../repositories/faqRepository');
jest.mock('../../services/cacheService');
jest.mock('../../services/translationService', () => ({
  translateText: jest.fn()
}));

describe('FAQService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockFaqs = [
    {
      _id: '123',
      question: 'Test Question 1?',
      answer: 'Test Answer 1',
      translations: {
        fr: { question: 'Question FR 1?', answer: 'Réponse FR 1' },
        es: { question: '¿Pregunta ES 1?', answer: 'Respuesta ES 1' }
      }
    },
    {
      _id: '456',
      question: 'Test Question 2?',
      answer: 'Test Answer 2',
      translations: {
        fr: { question: 'Question FR 2?', answer: 'Réponse FR 2' },
        es: { question: '¿Pregunta ES 2?', answer: 'Respuesta ES 2' }
      }
    }
  ];

  describe('createFAQ', () => {
    const mockQuestion = 'Test question?';
    const mockAnswer = 'Test answer';

    it('should create FAQ with translations', async () => {
      // Set up mock translations
      translateText
        .mockImplementation((text, lang) => {
          if (lang === 'fr') {
            return text === mockQuestion ? 'Question FR?' : 'Réponse FR';
          }
          if (lang === 'es') {
            return text === mockQuestion ? '¿Pregunta ES?' : 'Respuesta ES';
          }
          return text;
        });

      const expectedTranslations = {
        fr: { question: 'Question FR?', answer: 'Réponse FR' },
        es: { question: '¿Pregunta ES?', answer: 'Respuesta ES' }
      };

      const mockCreatedFaq = {
        question: mockQuestion,
        answer: mockAnswer,
        translations: expectedTranslations
      };

      faqRepository.create.mockResolvedValue(mockCreatedFaq);

      const result = await faqService.createFAQ(mockQuestion, mockAnswer);

      expect(translateText).toHaveBeenCalledTimes(4);
      expect(translateText).toHaveBeenCalledWith(mockQuestion, 'fr');
      expect(translateText).toHaveBeenCalledWith(mockQuestion, 'es');
      expect(translateText).toHaveBeenCalledWith(mockAnswer, 'fr');
      expect(translateText).toHaveBeenCalledWith(mockAnswer, 'es');
      
      expect(faqRepository.create).toHaveBeenCalledWith({
        question: mockQuestion,
        answer: mockAnswer,
        translations: expectedTranslations
      });
      expect(cacheService.delete).toHaveBeenCalledWith('faqs_*');
      expect(result).toEqual(mockCreatedFaq);
    });

    it('should handle translation errors gracefully', async () => {
      translateText.mockRejectedValue(new Error('Translation failed'));

      const mockCreatedFaq = {
        question: mockQuestion,
        answer: mockAnswer,
        translations: {}
      };

      faqRepository.create.mockResolvedValue(mockCreatedFaq);

      await expect(faqService.createFAQ(mockQuestion, mockAnswer))
        .rejects
        .toThrow('Translation failed');
    });
  });

  describe('getFAQs', () => {
    it('should return cached FAQs if available', async () => {
      const cachedFaqs = [{ question: 'Cached?', answer: 'Yes' }];
      cacheService.get.mockResolvedValue(JSON.stringify(cachedFaqs));

      const result = await faqService.getFAQs('en');

      expect(cacheService.get).toHaveBeenCalledWith('faqs_en');
      expect(faqRepository.findAll).not.toHaveBeenCalled();
      expect(result).toEqual(cachedFaqs);
    });

    it('should fetch and translate FAQs for non-English language', async () => {
      cacheService.get.mockResolvedValue(null);
      faqRepository.findAll.mockResolvedValue(mockFaqs);

      const result = await faqService.getFAQs('fr');

      expect(result[0].question).toBe('Question FR 1?');
      expect(result[0].answer).toBe('Réponse FR 1');
      expect(cacheService.set).toHaveBeenCalled();
    });
    
    it('should handle database errors', async () => {
      cacheService.get.mockResolvedValue(null);
      faqRepository.findAll.mockRejectedValue(new Error('Database error'));

      await expect(faqService.getFAQs('en'))
        .rejects
        .toThrow('Database error');
    });

    it('should fallback to original text if translation not available', async () => {
      cacheService.get.mockResolvedValue(null);
      const faqWithoutTranslation = {
        _id: '789',
        question: 'No translation?',
        answer: 'Original answer',
        translations: {}
      };
      faqRepository.findAll.mockResolvedValue([faqWithoutTranslation]);

      const result = await faqService.getFAQs('fr');

      expect(result[0].question).toBe('No translation?');
      expect(result[0].answer).toBe('Original answer');
    });
  });

  describe('updateFAQ', () => {
    const mockId = 'test-id';
    const mockUpdateData = {
      question: 'Updated question?',
      answer: 'Updated answer'
    };

    it('should update FAQ with new translations', async () => {
      translateText
        .mockImplementation((text, lang) => {
          if (lang === 'fr') {
            return text === mockUpdateData.question ? 'Question MAJ FR?' : 'Réponse MAJ';
          }
          if (lang === 'es') {
            return text === mockUpdateData.question ? '¿Pregunta actualizada?' : 'Respuesta actualizada';
          }
          return text;
        });

      const expectedTranslations = {
        fr: {
          question: 'Question MAJ FR?',
          answer: 'Réponse MAJ'
        },
        es: {
          question: '¿Pregunta actualizada?',
          answer: 'Respuesta actualizada'
        }
      };

      const mockUpdatedFaq = {
        _id: mockId,
        ...mockUpdateData,
        translations: expectedTranslations
      };

      faqRepository.update.mockResolvedValue(mockUpdatedFaq);

      const result = await faqService.updateFAQ(mockId, mockUpdateData);

      expect(translateText).toHaveBeenCalledTimes(4);
      expect(translateText).toHaveBeenCalledWith(mockUpdateData.question, 'fr');
      expect(translateText).toHaveBeenCalledWith(mockUpdateData.question, 'es');
      expect(translateText).toHaveBeenCalledWith(mockUpdateData.answer, 'fr');
      expect(translateText).toHaveBeenCalledWith(mockUpdateData.answer, 'es');

      expect(faqRepository.update).toHaveBeenCalledWith(mockId, {
        ...mockUpdateData,
        translations: expectedTranslations
      });
      expect(cacheService.delete).toHaveBeenCalledWith('faqs_*');
      expect(result).toEqual(mockUpdatedFaq);
    });

    it('should handle translation errors during update', async () => {
      translateText.mockRejectedValue(new Error('Translation failed'));

      await expect(faqService.updateFAQ(mockId, mockUpdateData))
        .rejects
        .toThrow('Translation failed');

      expect(faqRepository.update).not.toHaveBeenCalled();
    });

    it('should handle database errors during update', async () => {
      translateText.mockImplementation((text) => `Translated ${text}`);
      faqRepository.update.mockRejectedValue(new Error('Database error'));

      await expect(faqService.updateFAQ(mockId, mockUpdateData))
        .rejects
        .toThrow('Database error');
    });

    it('should handle FAQ not found during update', async () => {
      // Mock successful translations but FAQ not found in database
      translateText.mockImplementation((text) => `Translated ${text}`);
      faqRepository.update.mockResolvedValue(null);

      await expect(faqService.updateFAQ(mockId, mockUpdateData))
        .rejects
        .toThrow('FAQ not found');

      expect(faqRepository.update).toHaveBeenCalled();
      expect(cacheService.delete).not.toHaveBeenCalled();
    });
  });

  describe('deleteFAQ', () => {
    it('should delete FAQ and clear cache', async () => {
      const mockId = 'test-id';
      faqRepository.delete.mockResolvedValue({ acknowledged: true });

      await faqService.deleteFAQ(mockId);

      expect(faqRepository.delete).toHaveBeenCalledWith(mockId);
      expect(cacheService.delete).toHaveBeenCalledWith('faqs_*');
    });

    it('should throw error if FAQ not found', async () => {
      const mockId = 'nonexistent-id';
      faqRepository.delete.mockResolvedValue(null);

      await expect(faqService.deleteFAQ(mockId))
        .rejects
        .toThrow('FAQ not found');
    });
  });
}); 