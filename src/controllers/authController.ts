import { Request, Response } from "express";
import { IUserData } from "../types/userTypes";

import * as authService from '../services/authService';

export async function signUp(req: Request, res: Response){

    const userData : IUserData = req.body;

    const signUp = await authService.signUp(userData);
    res.sendStatus(201);
}


export async function signIn(req: Request, res: Response){

    const userData : IUserData = req.body;

    const token = await authService.signIn(userData);
    res.status(200).send(token);
}