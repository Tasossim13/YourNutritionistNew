const express = require('express');
const path = require('path');
const fs = require('fs');  

const app = express();
const port = 3001;

// Ορισμός του φακέλου που περιέχει τα στατικά αρχεία (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ρίζα διαδρομή για την αρχική σελίδα
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Διαδρομή για το αρχείο JSON
app.get('/nutriJson', (req, res) => {
    fs.readFile(path.join(__dirname, 'public', 'nutriJson.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the JSON file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
