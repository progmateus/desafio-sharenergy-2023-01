import mongoose, { ConnectOptions } from "mongoose";
import config from "../config/database.js";


mongoose.set('strictQuery', true);
mongoose.connect(config.url, {
    useNewUrlParser: true,
} as ConnectOptions)
    .then((db) => {
        console.log("Database Connected Successfuly.");
    })
    .catch((err) => {
        console.log("Error Connectiong to the Database", err);
    });
mongoose.Promise = global.Promise


export { mongoose }

