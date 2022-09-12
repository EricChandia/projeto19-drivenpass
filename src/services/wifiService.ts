import * as wifiRepository from "../repositories/wifiRepository";
import { encrypt,decrypt } from "../utils/cryptr";
import { Wifi } from "@prisma/client";
import { IWifiData } from "../types/wifiTypes";

export async function createWifi(userId: number, wifiData: IWifiData) {

    //const wifi = await wifiRepository.findByUserIdAndTitle(userId, wifiData.title);

    const encryptedPassword = encrypt(wifiData.password);

    await wifiRepository.insert(userId, { name:wifiData.name, password:encryptedPassword, title:wifiData.title });

    return;
}

export async function getWifis(userId: number) {
    const wifiData:Wifi[] = await wifiRepository.findAll(userId);
    let wifis:Object[] = [];
    wifiData.map(wifi => {
        const descryptedWifi = decrypt(wifi.password);
        wifis.push({title: wifi.title, password: descryptedWifi}) ;
        
    });
    return wifis;
}

export async function getWifiById(id: number, userId: number) {
    const wifi:Wifi|null = await validateUserWifi(id, userId);

    const descryptedWifi = decrypt(wifi.password);
    return { title: wifi.title, password: descryptedWifi };
}

export async function deleteWifi(id: number, userId: number) {
    const wifi:Wifi|null = await validateUserWifi(id, userId);

    await wifiRepository.remove(id);

    return;
}


async function validateUserWifi(id: number, userId:number){

    const wifi:Wifi|null = await wifiRepository.findById(id);

    if(!wifi){
        throw { type: 'bad_request', msg: "Secure Note does not exists" }
    }

    if(wifi?.userId !== userId){
        throw { type: 'unauthorized', msg: "This Secure Note does not belongs to this user" }
    }

    return wifi;
} 