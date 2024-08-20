
async function storeInput() {
    const weightChoice = document.getElementById('weight').value;
    const usersChoice = document.getElementById('choiceId').value; // User's goal (lose weight, gain weight, etc.)
    const heightChoice = document.getElementById('height').value;
    const ageChoice = document.getElementById('age').value;
    const genderChoice = document.getElementById('genderId').value;
    const exerciseChoice = document.getElementById('exerciseId').value;
    const dietChoice = document.getElementById('dietId').value;
    const mealsChoice = document.getElementById('meals_perId').value;
    const checkboxes = document.querySelectorAll('.checkbox');
    const allergyValues = [0, 0, 0, 0];
    checkboxes.forEach((checkbox) => {
        const index = parseInt(checkbox.value) - 1;
        allergyValues[index] = checkbox.checked ? 1 : 0;
        console.log('Checked values:', allergyValues);
    });

    console.log('Checked values:', allergyValues);

    const userInputElement = document.getElementById('user1');
    let formData = {
        weight: weightChoice,
        height: heightChoice,
        age: ageChoice,
        choice: usersChoice,
        gender: genderChoice,
        exercise: exerciseChoice,
        diet: dietChoice,
        meals: mealsChoice,
        allergies: allergyValues
    };

    console.log(formData);

    const calories = calculateDailyCalories(formData.gender, formData.weight, formData.height, formData.age);
    console.log(calories);

    const protein = proteinCalc(formData.weight, formData.choice, formData.exercise);
    console.log(protein);

    const fat = calculateDailyFatIntake(formData.choice, calories);
    const carbs = (calories - protein * 4 - fat * 9) / 4;
    console.log(carbs);

    const recipeCount = parseInt(formData.meals);

    const days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];
    const allRecipes = {};

    try {
        for (const day of days) {
            const response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ calories, recipeCount }),
            });

            
            const recipes = await response.json();
            console.log(`Recipes for ${day}:`, recipes);

            allRecipes[day] = recipes;
        }

        generateMealPlan(allRecipes, recipeCount);

    } catch (error) {
        console.error('Error fetching recipes:', error);
    }

    return false;
}

function proteinCalc(weight, choice, exercise){//calculates protein daily intake based on exercise frequency ,or just in weight if exercise is not so often


    if(exercise=="sometimes"){
        weight= weight; 
    }else if(exercise=="often"){
        weight= weight*1.2; 
    }else if(exercise=="everyDay"){
        weight= weight*1.6; 
    }else if(exercise=="rarely"){
        weight= weight*0.8;
    }

    if(choice=="lose"){
        weight= weight*1.2;
    }else if(choice=="gain"){
        weight= weight*1.1;
    }else{
        weight= weight*0.8;
    }

    weight = parseInt(weight);

    
    console.log("you must take "+ weight +"g of Protein Based on your goal")
    return weight;
    
}

function calculateDailyFatIntake(goal, calories) {//calculates daily fat intake based on bmr and all the other values

    let minFat;
    let maxFat;

    if (goal == 'lose') {
        minFat = 0.20;
        maxFat=0.35;
    } else if (goal == 'gain') {
        minFat=0.25;
        maxFat=0.40;
    } else if (goal == 'maintain') {
        minFat=0.25;
        maxFat=0.35;
    } else {
        console.error("Error");
        return;
    }

    const minFatIntake = (calories * minFat) / 9;
    const maxFatIntake = (calories * maxFat) / 9;
    const average = ((minFatIntake+maxFatIntake)/2);
    console.log("You must take: "+parseInt(average)+"g of fat daily.");
    return parseInt(average);
}

function calculateDailyCalories(gender, weight,height,age){
    let BMR;
    if(gender=="male"){
        BMR = (10*weight) + (6.25*height) - (5*age) +5;
    }else{
        BMR = (10*weight) + (6.25*height) - (5*age) -161;
    }
    return BMR; 
}


function generateMealPlan(allRecipes, recipeCount) {
    const table = document.getElementById('meal-plan');
    const days = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];

    // Clear existing table content
    table.innerHTML = '';

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    days.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Populate the table with recipes
    for (let rowIndex = 0; rowIndex < recipeCount; rowIndex++) {
        const tr = document.createElement('tr');
        days.forEach(day => {
            const td = document.createElement('td');
            const recipes = allRecipes[day];
            const recipeIndex = rowIndex % recipes.length;
            td.textContent = get-recipes.name;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    }
}