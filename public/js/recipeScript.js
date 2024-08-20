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
                instructions.classList.add('recipe-nutrition');
                instructions.innerHTML = `<strong>Protein:</strong> ${recipe.protein_g} | <strong>Fat:</strong> ${recipe.fat_g} | <strong>Carbohydrates:</strong> ${recipe.carbohydrates_g}`;
                recipeContainer.appendChild(instructions);

                recipeList.appendChild(recipeContainer);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
});
