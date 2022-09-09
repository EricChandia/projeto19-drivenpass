import { SecureNote } from '@prisma/client';

export type ISecureNoteData = Omit<SecureNote, 'id' | 'userId'>;