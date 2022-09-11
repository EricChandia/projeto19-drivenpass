import client from "../database/prismaClient";
import { ICardData } from "../types/cardTypes";
import { Card } from "@prisma/client";

export async function insert(userId: number, cardData: ICardData) {
    await client.card.create({ data: {
         userId, 
         ...cardData
    } });
}

export async function findAll(userId: number):Promise<Card[]> {
    return await client.card.findMany({where: { userId: userId }});
}

export async function findById(id:number):Promise<Card | null> {
    return await client.card.findUnique({ where: { id: id } });
}

export async function findByUserIdAndTitle(userId: number, title:string):Promise<Card[]> {
    return await client.card.findMany({ where: { title: title, userId: userId } });
}

export async function remove(id: number) {
    await client.card.delete({ where: { id: id } });
}