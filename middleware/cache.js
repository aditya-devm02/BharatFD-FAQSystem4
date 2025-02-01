const cacheService = require("../services/cacheService");

const cacheMiddleware = async (req, res, next) => {
  const lang = req.query.lang || "en";
  try {
    const cachedData = await cacheService.get(`faqs_${lang}`);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = cacheMiddleware;