import mongoose from 'mongoose';
import FAQRepository from '../../repositories/faqRepository';
import FAQ from '../../models/faqModel';

describe('FAQ Repository', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await FAQ.deleteMany({});
  });

  describe('create', () => {
    it('should create a new FAQ', async () => {
      const faqData = {
        question: 'Test question?',
        answer: 'Test answer',
        translations: {
          fr: { question: 'Test FR?', answer: 'Oui' }
        }
      };

      const faq = await FAQRepository.create(faqData);

      expect(faq.question).toBe(faqData.question);
      expect(faq.translations.fr.question).toBe(faqData.translations.fr.question);
    });
  });

  describe('findAll', () => {
    it('should return all FAQs', async () => {
      const faqData = [
        { question: 'Q1?', answer: 'A1' },
        { question: 'Q2?', answer: 'A2' }
      ];

      await FAQ.insertMany(faqData);

      const faqs = await FAQRepository.findAll();

      expect(faqs).toHaveLength(2);
      expect(faqs[0].question).toBe('Q1?');
    });
  });

  describe('findById', () => {
    it('should return FAQ by ID', async () => {
      const faqData = {
        question: 'Test?',
        answer: 'Yes'
      };

      const created = await FAQ.create(faqData);
      const found = await FAQRepository.findById(created._id);

      expect(found.question).toBe(faqData.question);
    });
  });

  describe('update', () => {
    it('should update FAQ', async () => {
      const faq = await FAQ.create({
        question: 'Old?',
        answer: 'Old'
      });

      const updated = await FAQRepository.update(faq._id, {
        question: 'New?',
        answer: 'New'
      });

      expect(updated.question).toBe('New?');
    });
  });

  describe('delete', () => {
    it('should delete FAQ', async () => {
      const faq = await FAQ.create({
        question: 'Delete?',
        answer: 'Yes'
      });

      await FAQRepository.delete(faq._id);
      const found = await FAQ.findById(faq._id);

      expect(found).toBeNull();
    });
  });
}); 