import express from 'express';
const app = express();
import getConnectionObj from './connection.js';

const PORT = 8000;
const MONGO_USERNAME=process.env.MONGO_USERNAME;
const MONGO_PASSWORD=process.env.MONGO_PASSWORD;
const CONNECTION_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb:27017/my-db?authSource=admin` // mongodb is name of container

app.get("/data", (req, res) => {
    res.send("KDJD(ED")
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