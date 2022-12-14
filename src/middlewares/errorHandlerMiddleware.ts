import { NextFunction, Request, Response } from "express";


const ERRORS: any = {
  unauthorized: 401,
  conflict: 409,
  not_found: 404,
  bad_request: 400
};

export default function errorHandlerMiddleware(
  err:any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  const type: string = err.type;
  const msg: string = err.msg;
  let statusCode = ERRORS[type];
  if (!statusCode) statusCode = 500; // internal server error


  if(!msg){
    return res.sendStatus(statusCode); 
  }else{
    return res.status(statusCode).send(msg);
  }
  
}
