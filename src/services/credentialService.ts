import * as credentialRepository from "../repositories/credentialRepository";
import { ICredentialData } from "../types/credentialTypes";
import { Credential } from "@prisma/client";
import { encrypt,decrypt } from "../utils/cryptr";


export async function createCredential(userId: number, credentialData: ICredentialData) {

    const credential = await credentialRepository.findByUserIdAndTitle(userId, credentialData.title);
    if(credential.length > 0){
        throw { type: 'conflict' }; 
    }

    credentialData.password = encrypt(credentialData.password);

    await credentialRepository.insert(userId, credentialData);

    return;
}

export async function getCredentials(userId: number) {
    const credentialsData:Credential[] = await credentialRepository.findAll(userId);
    let credentials:Object[] = [];
    credentialsData.map(credential => {
        const descryptedPassword = decrypt(credential.password);
        credentials.push({title: credential.title, url: credential.url, username: credential.username, password: descryptedPassword}) ;
        
    });
    return credentials;
}

export async function getCredentialById(id: number, userId: number) {
    const credential:Credential|null = await validateUserCredential(id, userId);

    const descryptedPassword = decrypt(credential.password);
    return { title: credential.title, url: credential.url, username: credential.username, password: descryptedPassword };
}

export async function deleteCredential(id: number, userId: number) {
    const credential:Credential|null = await validateUserCredential(id, userId);

    await credentialRepository.remove(id);

    return;
}


async function validateUserCredential(id: number, userId:number){

    const credential:Credential|null = await credentialRepository.findById(id);

    if(!credential){
        throw { type: 'bad_request', msg: "Credential does not exists" }
    }

    if(credential?.userId !== userId){
        throw { type: 'unauthorized', msg: "This credential does not belongs to this user" }
    }

    return credential;
} 