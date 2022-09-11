import client from "../database/prismaClient";
import { ISecureNoteData } from "../types/secureNoteTypes";
import { SecureNote } from "@prisma/client";

export async function insert(userId: number, secureNoteData: ISecureNoteData) {
    await client.secureNote.create({ data: {
         userId, 
         ...secureNoteData
    } });
}

export async function findAll(userId: number):Promise<SecureNote[]> {
    return await client.secureNote.findMany({where: { userId: userId }});
}

export async function findById(id:number):Promise<SecureNote | null> {
    return await client.secureNote.findUnique({ where: { id: id } });
}

export async function findByUserIdAndTitle(userId: number, title:string) {
    return await client.secureNote.findMany({ where: { title: title, userId: userId } });
}

export async function remove(id: number) {
    await client.secureNote.delete({ where: { id: id } });
}