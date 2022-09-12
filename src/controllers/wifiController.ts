import { Request, Response } from 'express';
import { IWifiData } from '../types/wifiTypes';
import { Wifi } from '@prisma/client';
import * as wifiService from "../services/wifiService";


export async function createWifi(req: Request, res: Response) {
    const wifiData:IWifiData = req.body;
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    await wifiService.createWifi(Number(userId), wifiData);

    res.sendStatus(200);
}

export async function getWifis(req: Request, res: Response) {
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    const wifis = await wifiService.getWifis(Number(userId));

    res.status(200).send(wifis);
}

export async function getWifiById(req: Request, res: Response) {
    const { id } = req.params;
    if(!id) { res.sendStatus(400) }
    const verifiedUser = res.locals.user;
    const { id:userId } = verifiedUser;
    
    const wifi = await wifiService.getWifiById(Number(id), Number(userId));

    res.status(200).send(wifi);
}

export async function deleteWifi(req: Request, res: Response) {
    const { id } = req.params;
    const verifiedUserId = res.locals.user.id;
    
    await wifiService.deleteWifi(Number(id), Number(verifiedUserId));

    res.sendStatus(200);
}