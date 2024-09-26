var calories=0;
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
    const userInputElement1 = document.getElementById('userInput1');
    const userInputElement2 = document.getElementById('userInput2');
    
    if(gender=="male" || gender=="female"){
        calories = calculateDailyCalories(gender,weight,height,age, exercise); 
        userInputElement.innerHTML = `<h3>To Maintain Weight you Should Eat ${calories} Calories Per Day!</h3>`;
        userInputElement1.innerHTML = `<h3>To <b>Lose Weight</b> you must eat less than ${calories} Calories Per Day!</h3><h3>To <b>Gain Weight</b> you must eat more than ${calories} Calories Per Day!</h3>`;
        userInputElement2.innerHTML = `<h3>You have ${calories} Calories Left</h3>`;
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

    let activityMultiplier;

    switch (exercise) {
        case 'sedentary': // Λίγη ή καθόλου άσκηση
            activityMultiplier = 1.2;
            break;
        case 'lightly_active': // Ελαφριά άσκηση 1-3 φορές την εβδομάδα
            activityMultiplier = 1.375;
            break;
        case 'moderately_active': // Μέτρια άσκηση 3-5 φορές την εβδομάδα
            activityMultiplier = 1.55;
            break;
        case 'very_active': // Έντονη άσκηση 6-7 φορές την εβδομάδα
            activityMultiplier = 1.725;
            break;
        case 'super_active': // Πολύ έντονη άσκηση ή φυσική εργασία
            activityMultiplier = 1.9;
            break;
        default:
            activityMultiplier = 1.2; // Βασική τιμή για Sedentary
    }

    // Υπολογισμός TDEE: BMR * πολλαπλασιαστής δραστηριότητας
    const TDEE = BMR * activityMultiplier;
    return TDEE;
    //algorithmos gia metrisi
    /*Ο τύπος του Mifflin-St Jeor είναι ο εξής:
Για άντρες: BMR = (10 × βάρος σε κιλά) + (6.25 × ύψος σε εκατοστά) - (5 × ηλικία σε έτη) + 5
Για γυναίκες: BMR = (10 × βάρος σε κιλά) + (6.25 × ύψος σε εκατοστά) - (5 × ηλικία σε έτη) - 161*/
}

let currentStep = 0;

function showStep(step) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((stepElement, index) => {
        if (index === step) {
            stepElement.classList.add('active');
            stepElement.classList.remove('fade-out');
        } else {
            stepElement.classList.add('fade-out');
            setTimeout(() => {
                stepElement.classList.remove('active');
            }, 500); // the timeout should match the CSS transition duration
        }
    });
    console.log('Showing step:', step);
}

function nextStep() {
    const steps = document.querySelectorAll('.step');
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
        console.log('Moved to step:', currentStep);
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('multistepForm').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Η φόρμα υποβλήθηκε επιτυχώς!');
        console.log('Form submitted');
        // Μπορείς να προσθέσεις επιπλέον λειτουργικότητα εδώ, όπως αποστολή των δεδομένων της φόρμας σε έναν διακομιστή
    });

    showStep(currentStep);

    let count = calories;
    const selectElement = document.getElementById('fruits');
    const userInputElement2 = document.getElementById('userInput2');

    selectElement.addEventListener('change', function() {
        let subtractValue = 0;

        switch (selectElement.value) {
            case 'apple':
                subtractValue = 100; 
                break;
            case 'banana':
                subtractValue = 200; 
                break;
            case 'mango':
                subtractValue = 300; 
                break;
            case 'watermelon':
                subtractValue = 400; 
                break;
            default:
                subtractValue = 0;
        }

        if (calories >= subtractValue) {  // Εξασφαλίζει ότι ο αριθμός δεν θα πάει κάτω από το μηδέν
            calories -= subtractValue; // Αφαίρεση συγκεκριμένου αριθμού
            userInputElement2.innerHTML = `<h3>You Have ${calories} Calories Left</h3>`; // Ενημέρωση του υπόλοιπου
        }
    });
});


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
        event.preventDefault(); // Αποτρέπει την προεπιλεγμένη συμπεριφορά του Enter (π.χ. υποβολή φόρμας)
        nextStep(); // Καλεί τη συνάρτηση για να πάει στο επόμενο βήμα
    }
});
