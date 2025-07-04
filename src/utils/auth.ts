import { Request } from "express";
import { sign, verify } from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorized-exception";
import { AuthModel } from "../models/auth.model";
import { UserModel } from "../models/user.model";

export const PASSWORD_JWT = "umasenhamuitograndedepoismudar";

export const generateToken = (user: UserModel): string => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      typeUser: user.typeUser,
    } as AuthModel,
    PASSWORD_JWT,
    {
      subject: String(user.id),
      expiresIn: "904800000",
    }
  );
};

export const verifyToken = async (
  authorization?: string
): Promise<AuthModel> => {
  if (!authorization) {
    throw new UnauthorizedException();
  }
  const [, token] = authorization.split(" ");

  try {
    const decodedToken = <AuthModel>verify(token, PASSWORD_JWT);

    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException();
  }
};

export const getUserByToken = async (req: Request): Promise<AuthModel> => {
  const authorization = req.headers.authorization;

  return verifyToken(authorization);
};
