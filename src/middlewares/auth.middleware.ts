import { NextFunction, Request, Response } from "express";
import { ReturnError } from "../exceptions/return-error-exception";
import { verifyToken } from "../utils/auth";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization = req.headers.authorization;

  await verifyToken(authorization)
    .then(() => {
      next();
    })
    .catch((error: any) => {
      new ReturnError(res, error);
    });
};
