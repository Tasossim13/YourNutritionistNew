const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Ορισμός του φακέλου που περιέχει τα στατικά αρχεία (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Ρίζα διαδρομή για την αρχική σελίδα
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
