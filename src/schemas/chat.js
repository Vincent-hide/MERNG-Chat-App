import Joi from "joi";

export const startChat = Joi.object({
  title: Joi.string().min(6).d
})