import Joi from "joi";

export const secureNoteSchema = Joi.object({
  title: Joi.string().required(),
  note: Joi.string().required()
});
