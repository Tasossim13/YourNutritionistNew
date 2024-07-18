# YourNutritionistNew
YourNutritionist New edition

YourNutritionist is a web app for people who try to build a better lifestyle and be more healthy!

YourNutritionist is a complete meal planning platform,
accessible via the web.Everyone can create personalized nutritional programs by introducing personal ones
expectations and requirements. Utilizing this information, the platform creates
meal plans tailored for the user. These meal plans include a variety of recipes and food options. It helps people 
who trying to build muscle, lose weight or just eat healthy. 

<h2>Usage:</h2>
After Downloading Files
</br>
  <h3>For server:</h3> Intall node.js from https://nodejs.org/en. Run "node server1.js" in terminal of choice. VSCode and nodemon was used during development.
  <h3>For Database:</h3> Download and install MongoDBCompass, following instructions from https://www.mongodb.com/products/tools/compass <br/>
                         Create database with Database name "yourNutritionistDataB" and Collection name "recipes", following instructions from https://www.mongodb.com/docs/compass/current/databases/ <br/>
                         Unzip Recipes_Final_tagged. Press Add_Data inside "yourNutritionistDataB" and import csv file found inside zip file.
  <h3>For Website:</h3>  Open index.html on your browser



<h2>Features:</h2>
 Website includes 5 main pages.
 
 <h3>Landing Page</h3> has links to every available webpage.  Functional

 <h3>Smart Nutri-planner</h3> receives data from user and creates a week long diet plan. nutriPlanner.js calculates the calories and macros (protein, fat, carbohydrates) the user is 
    determined to need from the information provided. nutriPlanner.js sends calorie data and calls the server1.js function post get-recipes.
    Each day is generated separetely from the rest. The planner splits the calorie requirement to 3 or 4 random numbers(depending on user choice) 
    and tries to find recipes whose calorie count is 50+- close to each number and returns an array of recipes for each day. Recipes are then placed dynamically into a table via generateMealPlan function.
      Semi-Functional 

 <h3>Suggested Recipes</h3> Recipes with user selected ingredients appear at the bottom of the site. Currently script runs without user inputs when site is loaded and 5 recipes from database are returned with
    basic information.   Non-Functional

 <h3>Calculate Calories</h3> receives data from user and calculate.js creates a calorie target for the user based of Miflin-St.Jeor methodology.   Functional

 <h3>Sign in/Register</h3>has form for data input.   Non-Functional

<h2>Notable information:</h2>
 Data was created by scraping allrecipes.com for recipe information that included basic nutrtitional values. 
 Data was then cleaned and transformed to useable form. Using the Food Data Central Foundations Food Database(https://fdc.nal.usda.gov/fdc-app.html#/food-search?type=Foundation&query=) 
 more detailed information about the nutritional value of the recipes, allergens and diet types was added to the data.

 Website includes responsive menu design for mobile devices
 

 


                  
