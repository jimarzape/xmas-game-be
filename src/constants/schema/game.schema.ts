import { celebrate, Joi, errors, Segments } from "celebrate";
export default {
  create: {
    [Segments.BODY]: {
      title: Joi.string().required(),
      link: Joi.string().required(),
    },
  },

  update: {
    [Segments.BODY]: {
      title: Joi.string().required(),
      link: Joi.string().required(),
    },
  },
};
