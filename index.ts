import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
const mainRouter = require("./src/mainFolder");
import cors from "cors";
import subRouter from "./src/subFolder";

//application setting
const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);
dotenv.config();
const database_connection: string = process.env.CONNECTION_KEY;

//database connection
mongoose
  .connect(database_connection)
  .then(() => console.log("connection successfull"))
  .catch((err) => console.log(err));

//application route
app.use("/main", mainRouter);
app.use("/sub", subRouter);

//application port
app.listen(3000, () => {
  console.log("Listening form port 3000");
});
