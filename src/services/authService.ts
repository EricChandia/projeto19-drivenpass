import bcrypt from "bcrypt";
import * as authRepository from "../repositories/authRepository";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUserData } from "../types/userTypes";

dotenv.config();

export async function signUp(userData: IUserData) {
    const salt = await bcrypt.genSalt();
    const { email, password }:{email:string, password:string} = userData;
    const passwordHash = bcrypt.hashSync(userData.password, salt);

    //Search User
    const user = await authRepository.findUserByEmail(email);
    if (user) {
      throw { type: 'conflict' };
    }

    const createUser: IUserData = { email, password:passwordHash };

    //Create User
    await authRepository.createUser(createUser);
  
    return;
  }
  

  export async function signIn(userData: IUserData) {
    
    const { email, password }:{email:string, password:string} = userData;
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw { type: 'not_found' };
    }
    
    if (
      !bcrypt.compareSync(password, user.password)
    ) {
      throw { type: 'unauthorized' }
    }

    const token:string = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "24h",
      }
    );
  
    return token;
  }
  
