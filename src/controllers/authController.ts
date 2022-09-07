import { Request, Response } from "express";
import * as authService from '../services/authService';

export async function register(req: Request, res: Response){


    const register = await authService.register();
    res.send(register);
}