import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError";
import { notFoundError } from "./ErrorMiddleware";

describe("Given a notFoundError function", () => {
  describe("When it receives a next function", () => {
    test("Then it should call that next function, with the CustomError with status 404 and the message 'Endpoint not found'", () => {
      type CustomResponse = Pick<Response, "status" | "json">;

      const response: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const request = {};

      const next = jest.fn();

      const customError = new CustomError(404, "Endpoint not found", "");

      notFoundError(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
