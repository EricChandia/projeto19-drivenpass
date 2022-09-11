import { Request, Response } from 'express';
import { ICredentialData } from '../types/credentialTypes';
import * as credentialService from "../services/credentialService";
import { Credential } from '@prisma/client';

export async function createCredential(req: Request, res: Response) {
    const credentialData:ICredentialData = req.body;
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    await credentialService.createCredential(Number(userId), credentialData);

    res.sendStatus(200);
}

export async function getCredentials(req: Request, res: Response) {
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    const credentials = await credentialService.getCredentials(Number(userId));

    res.status(200).send(credentials);
}

export async function getCredentialById(req: Request, res: Response) {
    const { id } = req.params;
    if(!id) { res.sendStatus(400) }
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    const credential = await credentialService.getCredentialById(Number(id), Number(userId));

    res.status(200).send(credential);
}

export async function deleteCredential(req: Request, res: Response) {
    const { id } = req.params;
    const verifiedUserId = res.locals.user.id;
    
    await credentialService.deleteCredential(Number(id), Number(verifiedUserId));

    res.sendStatus(200);
}