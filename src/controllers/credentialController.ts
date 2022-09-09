import { Request, Response } from 'express';
import { ICredentialData } from '../types/credentialTypes';

export async function createCredential(req: Request, res: Response) {
    const credentialData:ICredentialData = req.body;
    const verifiedUser = res.locals.user;
    console.log(verifiedUser); 

    res.sendStatus(200);
}