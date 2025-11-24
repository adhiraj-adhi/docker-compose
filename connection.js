import mongoose from "mongoose";

const getConnectionObj = (uri) => {
    try {
        return mongoose.connect(uri);
    } catch (error) {
        console.log("Error connecting to db:", error);
    }
}

export default getConnectionObj;