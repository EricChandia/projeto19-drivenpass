import { Request, Response } from 'express';
import { ISecureNoteData } from '../types/secureNoteTypes';
import * as secureNoteService from "../services/secureNotesService";
import { SecureNote } from '@prisma/client';

export async function createSecureNote(req: Request, res: Response) {
    const secureNoteData:ISecureNoteData = req.body;
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    await secureNoteService.createSecureNote(Number(userId), secureNoteData);

    res.sendStatus(200);
}

export async function getSecureNotes(req: Request, res: Response) {
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    const secureNotes = await secureNoteService.getSecureNotes(Number(userId));

    res.status(200).send(secureNotes);
}

export async function getSecureNoteById(req: Request, res: Response) {
    const { id } = req.params;
    if(!id) { res.sendStatus(400) }
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    const credential = await secureNoteService.getSecureNoteById(Number(id), Number(userId));

    res.status(200).send(credential);
}

export async function deleteSecureNote(req: Request, res: Response) {
    const { id } = req.params;
    const verifiedUserId = res.locals.user.id;
    
    await secureNoteService.deleteSecureNote(Number(id), Number(verifiedUserId));

    res.sendStatus(200);
}