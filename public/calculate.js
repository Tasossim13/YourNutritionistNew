function showInput() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const age = document.getElementById('age').value;
    const exercise = document.getElementById('exerciseId').value;

    let gender;

    if (document.getElementById('maleId').checked) {
        gender = document.getElementById('maleId').value;
    } else if (document.getElementById('femaleId').checked) {
        gender = document.getElementById('femaleId').value;
    } else {
        gender = "Not specified";
    }

    const userInputElement = document.getElementById('userInput');
    if(gender=="male" || gender=="female"){
        userInputElement.innerHTML = `<h3>You Should Eat ${calculateDailyCalories(gender,weight,height,age, exercise)} Calories Per Day!</h3>`;
    }else{
        userInputElement.innerHTML = `<h3>Gender Is Not Specified! </h3>`;
    }
    
    return false;
}

function calculateDailyCalories(gender, weight,height,age,exercise){
    /*na ftiaksw Sedentary (little to no exercise): TDEE = BMR × 1.2
Lightly Active (light exercise/sports 1-3 days/week): TDEE = BMR × 1.375
Moderately Active (moderate exercise/sports 3-5 days/week): TDEE = BMR × 1.55
Very Active (hard exercise/sports 6-7 days a week): TDEE = BMR × 1.725
Super Active (very hard exercise/sports, physical job, or training): TDEE = BMR × 1.9*/
    let BMR;
    if(gender=="male"){
        BMR = (10*weight) + (6.25*height) - (5*age) +5;
    }else{
        BMR = (10*weight) + (6.25*height) - (5*age) -161;
    }
    return BMR; //leitoyrgei mia xara
    //algorithmos gia metrisi
    /*Ο τύπος του Mifflin-St Jeor είναι ο εξής:
Για άντρες: BMR = (10 × βάρος σε κιλά) + (6.25 × ύψος σε εκατοστά) - (5 × ηλικία σε έτη) + 5
Για γυναίκες: BMR = (10 × βάρος σε κιλά) + (6.25 × ύψος σε εκατοστά) - (5 × ηλικία σε έτη) - 161*/
}
