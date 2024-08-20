function showRecipes() {
    const selectedFruit = document.getElementById('fruitId').value;
    const selectedVegetable = document.getElementById('VegetableId').value;
    const selectedMeat = document.getElementById('meatId').value;


    // Δημιουργία query string από τα επιλεγμένα συστατικά
    const queryString = `fruit=${selectedFruit}&vegetable=${selectedVegetable}&meat=${selectedMeat}`;
    
    fetch(`http://localhost:3000/`)
    .then(response => response.json())
    .then(data => {
        const recipeList = document.getElementById('recipe-list');
        recipeList.innerHTML = ''; // Καθαρισμός προηγούμενων συνταγών

        // Ανακάτεμα των δεδομένων
        const shuffledData = data.sort(() => 0.5 - Math.random());

        // Επιλογή των πρώτων 20 τυχαίων συνταγών
        shuffledData.slice(0, 20).forEach(recipe => {
            const recipeContainer = document.createElement('div');
            recipeContainer.classList.add('recipe-container');

            const title = document.createElement('div');
            title.classList.add('recipe-title');
            title.innerHTML = `<u><strong>${recipe.name}</strong> - ${recipe.calories} Calories</u>`;
            recipeContainer.appendChild(title);

            const ingredientsTitle = document.createElement('div');
            ingredientsTitle.innerHTML = `<strong>Ingredients: </strong>`;
            recipeContainer.appendChild(ingredientsTitle);
            const ingredientsList = document.createElement('tr');
            ingredientsList.classList.add('recipe-ingredients');
            const ingredientsArray = recipe.ingredients.split(';');
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
            nutrition.innerHTML = `<strong>Protein:</strong> ${recipe.protein_g} | <strong>Fat:</strong> ${recipe.fat_g} | <strong>Carbohydrates:</strong> ${recipe.carbohydrates_g}`;
            recipeContainer.appendChild(nutrition);

            recipeList.appendChild(recipeContainer);
        });
    })
    .catch(error => console.error('Error fetching recipes:', error));
return false; // Αποτροπή υποβολής φόρμας

}