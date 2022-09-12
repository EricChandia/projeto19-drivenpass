import client from "../database/prismaClient";
import { IWifiData } from "../types/wifiTypes";
import { Wifi } from "@prisma/client";

export async function insert(userId: number, wifiData: IWifiData) {
    await client.wifi.create({ data: {
         userId, 
         ...wifiData
    } });
}

export async function findAll(userId: number):Promise<Wifi[]> {
    return await client.wifi.findMany({where: { userId: userId }});
}

export async function findById(id:number):Promise<Wifi | null> {
    return await client.wifi.findUnique({ where: { id: id } });
}

export async function findByUserIdAndTitle(userId: number, title:string) {
    return await client.wifi.findMany({ where: { title: title, userId: userId } });
}

export async function remove(id: number) {
    await client.wifi.delete({ where: { id: id } });
}