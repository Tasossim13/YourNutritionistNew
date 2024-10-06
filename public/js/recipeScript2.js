document.addEventListener('DOMContentLoaded', function() {
  console.log('Script loaded');
  fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => {
          const recipeList = document.getElementById('recipe-list');
          data.slice(-5).forEach(recipe => {
              const recipeContainer = document.createElement('div');
              recipeContainer.classList.add('recipe-container');

              const title = document.createElement('div');
              title.classList.add('recipe-title');
              title.innerHTML = `<u><strong>${recipe.name}</strong> - ${recipe.nutrition.calories} Calories</u>`;
              recipeContainer.appendChild(title);

              const ingredientsTitle = document.createElement('div');
              ingredientsTitle.innerHTML = `<strong>Ingredients: </strong>`;
              recipeContainer.appendChild(ingredientsTitle);
              const ingredientsList = document.createElement('tr');
              ingredientsList.classList.add('recipe-ingredients');
              const ingredientsArray = recipe.ingredients;
              ingredientsArray.forEach(ingredient => {
                  const ingredientItem = document.createElement('tr');
                  ingredientItem.textContent = ingredient;
                  ingredientsList.appendChild(ingredientItem);
              });
              recipeContainer.appendChild(ingredientsList);

              const instructions = document.createElement('div');
              instructions.classList.add('recipe-instructions');
              instructions.innerHTML = `<strong>Instructions:</strong> ${recipe.instructions}`;
              recipeContainer.appendChild(instructions);

              const nutrition = document.createElement('div');
              nutrition.classList.add('recipe-nutrition');
              nutrition.innerHTML = `<strong>Protein:</strong> ${recipe.nutrition.protein}g | <strong>Fat:</strong> ${recipe.nutrition.fat}g | <strong>Carbohydrates:</strong> ${recipe.nutrition.carbohydrates}g`;
              recipeContainer.appendChild(nutrition);

              recipeList.appendChild(recipeContainer);
          });
      })
      .catch(error => console.error('Error fetching recipes:', error));

      let selectedFruits=[];
      let selectedVeges =[];
      let selectedMeats =[];
      //fruit filter mechanism
      const fruitsSelect = document.getElementById('fruits');
      const addFruitButton = document.getElementById('addFruitButton');
      const selectedFruitsList = document.getElementById('selectedFruits');
      const showRecipesButton = document.getElementById('showRecipesButton');

      const vegetablesSelect = document.getElementById('veges');
      const addVegetableButton = document.getElementById('addVegetableButton');
      const selectedVegetablesList = document.getElementById('selectedVegetables');

      const meatsSelect = document.getElementById('meats');
      const addMeatButton = document.getElementById('addMeatButton');
      const selectedMeatsList = document.getElementById('selectedMeats');

      addFruitButton.addEventListener('click', function() {
        const selectedFruit = fruitsSelect.value;
        if (selectedFruit && !selectedFruits.includes(selectedFruit)) {
            selectedFruits.push(selectedFruit); // Προσθήκη του φρούτου στη λίστα
            const li = document.createElement('li'); // Δημιουργία στοιχείου λίστας
            li.textContent = selectedFruit;
            selectedFruitsList.appendChild(li); // Προσθήκη του φρούτου στη λίστα στο UI
        } });

        addVegetableButton.addEventListener('click', function() {
          const selectedVegetable = vegetablesSelect.value;
          if (selectedVegetable && !selectedVeges.includes(selectedVegetable)) {
              selectedVeges.push(selectedVegetable);
              const li = document.createElement('li'); // Δημιουργία στοιχείου λίστας
              li.textContent = selectedVegetable;
              selectedVegetablesList.appendChild(li);
          }
        });
      
        addMeatButton.addEventListener('click', function() {
            const selectedMeat = meatsSelect.value;
            if (selectedMeat && !selectedMeats.includes(selectedMeat)) {
                selectedMeats.push(selectedMeat);
                const li = document.createElement('li'); // Δημιουργία στοιχείου λίστας
                li.textContent = selectedMeat;
                selectedMeatsList.appendChild(li);
            }
        });

        showRecipesButton.addEventListener('click', function() {
          fetch('http://localhost:3000') // Υποθέτουμε ότι εδώ επιστρέφονται όλες οι συνταγές
              .then(response => response.json())
              .then(data => {
                  const recipeList = document.getElementById('recipe-list');
                  recipeList.innerHTML = ''; // Καθαρισμός της λίστας συνταγών
                  const selectedIngredients =[...selectedFruits, ...selectedVeges , ...selectedMeats];
                  
                  // Φιλτράρουμε τις συνταγές με βάση τα επιλεγμένα φρούτα
                  const filteredRecipes = data.filter(recipe => {
                      return selectedIngredients.some(fruit => recipe.ingredientsForFiltering.includes(fruit));
                  });
  
                  // Εμφανίζουμε τις φιλτραρισμένες συνταγές
                  filteredRecipes.forEach(recipe => {
                      const recipeContainer = document.createElement('div');
                      recipeContainer.classList.add('recipe-container');
                      
                      const title = document.createElement('div');
                      title.classList.add('recipe-title');
                      title.innerHTML = `<u><strong>${recipe.name}</strong> - ${recipe.nutrition.calories} Calories</u>`;
                      recipeContainer.appendChild(title);
  
                      const ingredientsTitle = document.createElement('div');
                      ingredientsTitle.innerHTML = `<strong>Ingredients: </strong>`;
                      recipeContainer.appendChild(ingredientsTitle);
                      const ingredientsList = document.createElement('tr');
                      ingredientsList.classList.add('recipe-ingredients');
                      const ingredientsArray = recipe.ingredients;
                      ingredientsArray.forEach(ingredient => {
                          const ingredientItem = document.createElement('tr');
                          ingredientItem.textContent = ingredient;
                          ingredientsList.appendChild(ingredientItem);
                      });
                      recipeContainer.appendChild(ingredientsList);
  
                      const instructions = document.createElement('div');
                      instructions.classList.add('recipe-instructions');
                      instructions.innerHTML = `<strong>Instructions:</strong> ${recipe.instructions}`;
                      recipeContainer.appendChild(instructions);
  
                      const nutrition = document.createElement('div');
                      nutrition.classList.add('recipe-nutrition');
                      nutrition.innerHTML = `<strong>Protein:</strong> ${recipe.nutrition.protein}g | <strong>Fat:</strong> ${recipe.nutrition.fat}g | <strong>Carbohydrates:</strong> ${recipe.nutrition.carbohydrates}g`;
                      recipeContainer.appendChild(nutrition);
  
                      recipeList.appendChild(recipeContainer);
                  });
              })
              .catch(error => console.error('Error fetching recipes:', error));
      });
    }); 



function showFruits() {
    var fruitSelect = document.getElementById('fruitSelect');
    if (fruitSelect.style.display === "none") {
      fruitSelect.style.display = "block";
    } else {
      fruitSelect.style.display = "none";
    }
  }

  function showVegetables() {
    var VegesSelect = document.getElementById('vegesSelect');
    if (VegesSelect.style.display === "none") {
      VegesSelect.style.display = "block";
    } else {
      VegesSelect.style.display = "none";
    }
  }

  function showMeats() {
    var fruitSelect = document.getElementById('meatSelect');
    if (fruitSelect.style.display === "none") {
      fruitSelect.style.display = "block";
    } else {
      fruitSelect.style.display = "none";
    }
  }