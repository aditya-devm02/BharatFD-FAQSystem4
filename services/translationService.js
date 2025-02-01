const axios = require("axios");

const API_URL = "https://google-translate113.p.rapidapi.com/api/v1/translator/text";

const headers = {
  'x-rapidapi-host': process.env.RAPID_API_HOST,
  'x-rapidapi-key': process.env.RAPID_API_KEY,
  'Content-Type': 'application/json',
};

const translateText = async (text, targetLanguage) => {
  try {
    const body = { 
      "from": "en", 
      "to": targetLanguage, 
      "text": text 
    };

    const response = await axios.post(API_URL, body, { headers });
    return response.data.trans;
  } catch (error) {
    console.error("Error during translation:", error);
    throw new Error("Translation failed");
  }
};

module.exports = { translateText };