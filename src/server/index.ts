import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user/userRouter";
import { generalError, notFoundError } from "./middleware/ErrorMiddleware";

const allowedOrigins = process.env.ALLOWEN_ORIGIN;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/user", userRouter);

app.use(notFoundError);

app.use(generalError);

app.use(cors(options));

export default app;
