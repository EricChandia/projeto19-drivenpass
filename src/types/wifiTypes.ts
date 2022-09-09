import { Wifi } from '@prisma/client';

export type IWifiData = Omit<Wifi, 'id' | 'userId'>;