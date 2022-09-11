import client from "../database/prismaClient";
import { ICredentialData } from "../types/credentialTypes";
import { Credential } from "@prisma/client";

export async function insert(userId: number, credentialData: ICredentialData) {
    await client.credential.create({ data: {
        userId,
        ...credentialData
    } });
}

export async function findAll(userId: number):Promise<Credential[]> {
    return await client.credential.findMany({where: { userId: userId }});
}

export async function findById(id:number):Promise<Credential | null> {
    return await client.credential.findUnique({ where: { id: id } });
}

export async function findByUserIdAndTitle(userId: number, title:string) {
    return await client.credential.findMany({ where: { title: title, userId: userId } });
}

export async function remove(id: number) {
    await client.credential.delete({ where: { id: id } });
}