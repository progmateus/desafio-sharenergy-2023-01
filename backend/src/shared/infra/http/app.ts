import "dotenv";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import cors from "cors"
import { router } from "./routes/index"
import { AppError } from "../../../errors/AppError";
import { ValidationError } from "yup";


const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {

        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message
            })
        }

        if (err instanceof ValidationError) {
            let errors = {};


            err.inner.forEach(err => {
                errors[err.path] = err.errors;
            });


            return response.status(400).json({
                message: "Validation Fails",
                errors
            })
        }

        return response.status(500).json({
            status: "error",
            message: `internal server error - ${err.message}`
        })
    }
)

export { app };
