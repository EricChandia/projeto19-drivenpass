import { Request, Response } from 'express';
import { ICardData } from '../types/cardTypes';
import { Card } from '@prisma/client';
import * as cardService from "../services/cardService";


export async function createCard(req: Request, res: Response) {
    const cardData:ICardData = req.body;
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    await cardService.createCard(Number(userId), cardData);

    res.sendStatus(200);
}

export async function getCards(req: Request, res: Response) {
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    const cards = await cardService.getCards(Number(userId));

    res.status(200).send(cards);
}

export async function getCardById(req: Request, res: Response) {
    const { id } = req.params;
    if(!id) { res.sendStatus(400) }
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    const credential = await cardService.getCardById(Number(id), Number(userId));

    res.status(200).send(credential);
}

export async function deleteCard(req: Request, res: Response) {
    const { id } = req.params;
    const verifiedUserId = res.locals.user.id;
    
    await cardService.deleteCard(Number(id), Number(verifiedUserId));

    res.sendStatus(200);
}