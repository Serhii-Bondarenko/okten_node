import Joi from 'joi';

const postSchema = {
    create: Joi.object().keys({
        title: Joi.string().max(30)
            .trim(true)
            .required(),
        text: Joi.string().max(250)
            .trim(true)
            .required(),
        userId: Joi.number().min(1).required(),
    }),

    update: Joi.object().keys({
        title: Joi.string().max(30).trim(true),
        text: Joi.string().max(250)
            .trim(true),
    }),
};

export { postSchema };
