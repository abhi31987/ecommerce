const SearchModel = require('../models/searchModel');

const searchProducts = async (req, res) => {
  const { query } = req.query;
  let searchModel; // Declare searchModel in the broader scope

  try {
    searchModel = new SearchModel();
    await searchModel.connect();

    const searchResults = await searchModel.searchProducts(query);

    res.json(searchResults);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (searchModel) {
      await searchModel.closeConnection();
    }
  }
};

module.exports = { searchProducts };
