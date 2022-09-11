import client from "../database/prismaClient";
import { IUserData } from "../types/userTypes";

export async function findUserByEmail(email: string) {
    
    const user = await client.user.findUnique({ where: { email: email } });

    return user;
}


export async function createUser(userData : IUserData) {
       await client.user.create({ 	data: {
		email: userData.email,
		password: userData.password
	} });
}