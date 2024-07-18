const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Χρήση του cors middleware
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourNutritionistDataB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the recipe schema
const recipeSchema = new mongoose.Schema({
  name: String,
  url: String,
  category: String,
  summary: String,
  ingredients: String,
  directions: String,
  prep: String,
  cook: String,
  total: String,
  servings: Number,
  calories: Number,
  carbohydrates_g: Number,
  sugars_g: Number,
  fat_g: Number,
  saturated_fat_g: Number,
  protein_g: Number,
  dietary_fiber_g: Number,
  sodium_mg: Number,
  calories_from_fat: Number,
  calcium_mg: Number,
  iron_mg: Number,
  magnesium_mg: Number,
  potassium_mg: Number,
  vitamin_a_iu_IU: Number,
  niacin_equivalents_mg: Number,
  vitamin_c_mg: Number,
  folate_mcg: Number,
  is_vegan: Boolean,
  is_vegetarian: Boolean,
  is_pescatarian: Boolean,
  is_lactose_int: Boolean,
  is_nut_allergy: Boolean,
  is_celiac_allergy: Boolean,
  is_shellfish_allergy: Boolean,
});

// Define the recipe model
const Recipe = mongoose.model("Recipe", recipeSchema);

// Route to get all recipes
app.get("/recipes", (req, res) => {
  Recipe.find({}).then(function (recipes) {
    res.json(recipes);
  }).catch(function (err) {
    console.log(err);
  });
});

app.post('/get-recipes', async (req, res) => {
  const { calories, recipeCount } = req.body;

  try {
    let found = false;
    let attempts = 0;
    let recipes = [];

    
    const count = Math.min(Math.max(recipeCount, 3), 5);

    while (!found && attempts < 100) {
      attempts++;

      // Generate random calorie divisions
      const randomCalories = Array.from({ length: count }, () => Math.floor(Math.random() * calories));

      // Find random recipes for each calorie division
      const recipePromises = randomCalories.map(async (cal) => {
        
        const recipe = await Recipe.aggregate([
          { $match: { calories: { $gte: cal - 50, $lte: cal + 50 } } }, // Match recipes within the calorie range
          { $sample: { size: 1 } } // Randomly select one recipe
        ]);
        return recipe[0]; // Return the first (and only) randomly selected recipe
      });

      // Wait for all recipe queries to resolve
      recipes = await Promise.all(recipePromises);

      // Check if the sum of found recipes' calories matches the target calories
      if (recipes.reduce((sum, recipe) => sum + (recipe ? recipe.calories : 0), 0) >= calories - 50 &&
          recipes.reduce((sum, recipe) => sum + (recipe ? recipe.calories : 0), 0) <= calories + 50) {
        found = true;
      }
    }

    if (found) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: 'No combination found within the calorie range' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.post('/findRecipes', async (req, res) => {
    const ingredients = req.body.ingredients.split(',');
    try {
        // Query MongoDB for recipes containing the specified ingredients
        const recipes = await Recipe.find({ ingredients: { $in: ingredients } });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
app.listen(3001, () => {
  console.log("Server is running.");
});