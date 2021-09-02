import { Application, Request, Response } from "express";
import setMongo from "./mongo";
import setRoutes from "./routes";
import express = require('express');

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function main(): Promise<any> {
try {
    await setMongo();
    setRoutes(app);
    app.get(
        "/",
        async (req: Request, res: Response): Promise<Response> => {
            return res.status(200).send({
                message: "Hello World!",
            });
        }
    );
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
    } catch (error) {
        console.error(`Error occured: ${error.message}`);
    }
}
main();
