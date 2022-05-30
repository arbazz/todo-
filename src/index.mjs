import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { BASE_URL } from "./utils/Constant.mjs";
import { TokensRouter } from "./api/routes/tokens/tokensRouter.mjs";
import { CheckinsRouter } from "./api/routes/checkins/checkinsRouter.mjs";
import { RolesRouter } from "./api/routes/roles/rolesRouter.mjs";
import { TasksRouter } from "./api/routes/tasks/tasksRouter.mjs"; 
import { UsersRouter } from "./api/routes/users/usersRouter.mjs"; 
import { UserRolesRouter } from "./api/routes/userRoles/userRolesRouter.mjs"; 

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL =
  process.env.DATABASE_URL || "mongodb://localhost/Web-UI-BackendDB";

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//------------------- mongodb connection code --------------------------------
mongoose.connect(DB_URL);

//------------------- mongodb connected disconnected events -------------------
mongoose.connection.on("connected", function () {
  //connected
  console.log("Mongoose is connected");
  // process.exit(1);
});

mongoose.connection.on("disconnected", function () {
  //disconnected
  console.log("Mongoose is disconnected");
  process.exit(1);
});

mongoose.connection.on("error", function (err) {
  //any error
  console.log("Mongoose connection error: ", err);
  process.exit(1);
});

process.on("SIGINT", function () {
  // this function will run jst before app is closing
  console.log("app is terminating");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection closed");
    process.exit(0);
  });
});
//------------------- mongodb connected disconnected events -------------------


app.use(`${BASE_URL}`, TokensRouter);
app.use(`${BASE_URL}`, CheckinsRouter);
app.use(`${BASE_URL}`, RolesRouter);
app.use(`${BASE_URL}`, TasksRouter);
app.use(`${BASE_URL}`, UsersRouter);
app.use(`${BASE_URL}`, UserRolesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
