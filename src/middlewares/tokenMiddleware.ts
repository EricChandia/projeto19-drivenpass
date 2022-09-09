import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!authorization) {
    throw { type: 'bad_request' }
  }

    const verifiedUser = jwt.verify(String(token), String(process.env.JWT_SECRET));
    if(!verifiedUser){
        throw { type: 'unauthorized' }
      }

    res.locals.user = verifiedUser;
    next();
}
