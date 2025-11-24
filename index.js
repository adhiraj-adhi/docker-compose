import express from 'express';
const app = express();
import getConnectionObj from './connection.js';
import path from 'path';
import mongoose from 'mongoose';

const PORT = 8000;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const CONNECTION_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb:27017/my-db?authSource=admin` // mongodb is name of container

// Serve files in the 'public' directory statically
app.use(express.static(path.join(process.cwd(), 'public'))); //index.html in /public can be accessed via http://localhost:8000/public/index.html

// Define a simple schema and model for 'User' collection
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.get('/data', async (req, res) => {
    try {
        const users = await User.find(); // Get all users
        res.json(users);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to load data');
    }
});

app.get("/test", (req, res) => {
    res.send('Testing')
})

/** DATABASE CONNECTION */
const DBConnection = async (uri) => {
    try {
        const result = await getConnectionObj(uri);
        if (result) {
            app.listen(PORT, () => console.log(`Server running at ${PORT}`));
        }
    } catch (err) {
        console.error('Failed to connect to DB:', err);
    }
}

DBConnection(CONNECTION_URL);