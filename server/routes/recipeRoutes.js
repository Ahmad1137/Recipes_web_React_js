const express = require('express');
const router  = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes
 */
router.get('/', recipeController.homepage);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/categories', recipeController.explorecategories);
router.get('/categories/:id', recipeController.explorecategoriesByID);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.get('/about-recipe', recipeController.aboutRecipe);
router.get('/contact', recipeController.contactUs);
module.exports = router;
