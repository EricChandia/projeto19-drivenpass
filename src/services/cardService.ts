import * as cardRepository from "../repositories/cardRepository";
import { ICardData } from "../types/cardTypes";
import { Card } from "@prisma/client";
import { encrypt,decrypt } from "../utils/cryptr";


export async function createCard(userId: number, cardData: ICardData) {

    const card = await cardRepository.findByUserIdAndTitle(userId, cardData.title);
    if(card.length > 0){
        throw { type: 'conflict' }; 
    }

    const encryptedPassword = encrypt(String(cardData.password));
    const encryptedCVV = encrypt(String(cardData.cvv));

    const createCard:ICardData = { title:cardData.title, cardNumber: cardData.cardNumber, name: cardData.name, expirationDate: cardData.expirationDate, isVirtual: cardData.isVirtual, type: cardData.type, cvv: encryptedCVV, password: encryptedPassword }

    await cardRepository.insert(userId, createCard);

    return;
}

export async function getCards(userId: number) {
    const cardsData:Card[] = await cardRepository.findAll(userId);
    let cards:Object[] = [];
    cardsData.map(card => {
        const descryptedPassword = decrypt(card.password);
        const decryptedCVV = decrypt(card.cvv);
        cards.push({title:card.title, cardNumber: card.cardNumber, name: card.name, expirationDate: card.expirationDate, isVirtual: card.isVirtual, type: card.type, cvv: decryptedCVV, password: descryptedPassword}) ;
    });
    return cards;
}

export async function getCardById(id: number, userId: number) {
    const card:Card|null = await validateUserCard(id, userId);
    const decryptedCVV = decrypt(card.cvv);
    const descryptedPassword = decrypt(card.password);
    return { title:card.title, cardNumber: card.cardNumber, name: card.name, expirationDate: card.expirationDate, isVirtual: card.isVirtual, type: card.type, cvv: decryptedCVV, password: descryptedPassword };
}

export async function deleteCard(id: number, userId: number) {
    const card:Card|null = await validateUserCard(id, userId);

    await cardRepository.remove(id);

    return;
}


async function validateUserCard(id: number, userId:number){

    const card:Card|null = await cardRepository.findById(id);

    if(!card){
        throw { type: 'bad_request', msg: "card does not exists" }
    }

    if(card?.userId !== userId){
        throw { type: 'unauthorized', msg: "This card does not belongs to this user" }
    }

    return card;
} 