import Joi from "joi";
import { ICardData } from "../types/cardTypes";

export const cardSchema = Joi.object<ICardData>({
  cardNumber: Joi.number().required().integer().positive(),
  expirationDate: Joi.string().pattern(/^[0-9]{2}\/[0-9]{2}$/).required(),
  name: Joi.string().required(),
  cvv: Joi.number().required(),
  isVirtual: Joi.bool().required(),
  type: Joi.any().valid('credit', 'debit', 'both').required(),
  password: Joi.number().required(),
  title: Joi.string().required()
});
