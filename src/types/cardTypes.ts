import { Card } from '@prisma/client';

export type ICardData = Omit<Card, 'id' | 'userId'>;