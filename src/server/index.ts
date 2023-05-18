import express from "express";
import cors from "cors";
import morgan from "morgan";

const allowedOrigins = process.env.ALLOWEN_ORIGIN;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors(options));

export default app;
