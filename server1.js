const express = require('express');
const cors = require('cors'); // Προσθήκη του CORS
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));

app.use(express.json());

const uri = "mongodb://localhost:27017";
const dbName = 'yourNutritionistDataB';
const collectionName = 'recipes';

async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to database!");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        return collection;
    } catch (err) {
        console.error(err);
    }
}

app.post('/', async (req, res) => {
    try {
        const { calories, recipeCount } = req.body;
        // Σύνδεση με τη βάση δεδομένων και λήψη δεδομένων
        res.json({ message: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', async (req, res) => {
    const collection = await connectToDatabase();
    const data = await collection.find({}).toArray();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
