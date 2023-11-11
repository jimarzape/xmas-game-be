import { celebrate, Joi, errors, Segments } from "celebrate";
export default {
  create: {
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      category_id: Joi.number().required(),
      family_id: Joi.number().required(),
      gender: Joi.string().required(),
      age: Joi.number().required(),
      avatar: Joi.string().required(),
    },
  },

  update: {
    [Segments.BODY]: {
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      category_id: Joi.number().required(),
      family_id: Joi.number().required(),
      gender: Joi.string().required(),
      age: Joi.number().required(),
      avatar: Joi.string().required(),
    },
  },
};
