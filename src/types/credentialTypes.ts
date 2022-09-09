import { Credential } from '@prisma/client';

export type ICredentialData = Omit<Credential, 'id' | 'userId'>;