import Cryptr from 'cryptr';
import dotenv from 'dotenv';

dotenv.config();

const cryptr = new Cryptr(String(process.env.CRYPTR_KEY));

export function encrypt(word: string) {
    const encryptedString = cryptr.encrypt(word);
    return encryptedString;
}

export function decrypt(word: string) {
    const decryptedString = cryptr.decrypt(word);
    return decryptedString;
}