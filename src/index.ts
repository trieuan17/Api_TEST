import 'reflect-metadata'
import express  from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/user.routes"
import {createConnection} from "typeorm"
import bodyParser from 'body-parser';

const app = express();
createConnection();
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router
app.use(userRouter);

app.listen(3000);
console.log("server running on port", 3000)

