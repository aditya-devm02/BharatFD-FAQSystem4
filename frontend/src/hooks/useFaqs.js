import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/faqs';

export const useFaqs = (language = 'en') => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, [language]);

  const fetchFaqs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}?lang=${language}`);
      setFaqs(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createFaq = async (faqData) => {
    const response = await axios.post(API_URL, faqData);
    setFaqs([...faqs, response.data]);
    return response.data;
  };

  return { faqs, isLoading, error, createFaq };
};
