import createDebug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { ValidationError } from "express-validation";
import chalk from "chalk";

const debug = createDebug("items-api:server:middleware:errorControllers");

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found", "Not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const validationErrors = error.details

      .body!.map((joiError) => joiError.message)
      .join(" & ");

    error.publicMessage = validationErrors;

    debug(chalk.blue(validationErrors));

    debug(validationErrors);
  }

  debug(error.message);

  const statusCode = error.statusCode || 500;
  const messageError = error.statusCode ? error.publicMessage : "General error";

  res.status(statusCode).json({ messageError });
};

export default debug;
