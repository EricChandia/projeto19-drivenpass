import * as secureNotesRepository from "../repositories/secureNotesRepository";
import { encrypt,decrypt } from "../utils/cryptr";
import { SecureNote } from "@prisma/client";
import { ISecureNoteData } from "../types/secureNoteTypes";

export async function createSecureNote(userId: number, secureNoteData: ISecureNoteData) {

    if(secureNoteData.title.length > 50 || secureNoteData.note.length > 1000){
        throw { type: 'bad_request' , msg: 'Secure note title must be less than 50 characters. Secure note itself must be less than 1000 characters.' }
    }

    const secureNote = await secureNotesRepository.findByUserIdAndTitle(userId, secureNoteData.title);
    if(secureNote.length > 0){
        throw { type: 'conflict' }; 
    }

    secureNoteData.note = encrypt(secureNoteData.note);

    await secureNotesRepository.insert(userId, secureNoteData);

    return;
}

export async function getSecureNotes(userId: number) {
    const secureNotesData:SecureNote[] = await secureNotesRepository.findAll(userId);
    let secureNotes:Object[] = [];
    secureNotesData.map(note => {
        const descryptedNote = decrypt(note.note);
        secureNotes.push({title: note.title, note: descryptedNote}) ;
        
    });
    return secureNotes;
}

export async function getSecureNoteById(id: number, userId: number) {
    const secureNote:SecureNote|null = await validateUserSecureNote(id, userId);

    const descryptedNote = decrypt(secureNote.note);
    return { title: secureNote.title, note: descryptedNote };
}

export async function deleteSecureNote(id: number, userId: number) {
    const secureNote:SecureNote|null = await validateUserSecureNote(id, userId);

    await secureNotesRepository.remove(id);

    return;
}


async function validateUserSecureNote(id: number, userId:number){

    const secureNote:SecureNote|null = await secureNotesRepository.findById(id);

    if(!secureNote){
        throw { type: 'bad_request', msg: "Secure Note does not exists" }
    }

    if(secureNote?.userId !== userId){
        throw { type: 'unauthorized', msg: "This Secure Note does not belongs to this user" }
    }

    return secureNote;
} 