import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from 'express';

dotenv.config();

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if(!authorization)  { console.log("caiu no throe"); throw { type: 'bad_request' } }

  const token:string = authorization?.replace("Bearer ", "");
  const verifiedUser = jwt.verify(String(token), String(process.env.JWT_SECRET));
  if(!verifiedUser){
      throw { type: 'unauthorized' }
    }

  res.locals.user = verifiedUser;
  next();
}
