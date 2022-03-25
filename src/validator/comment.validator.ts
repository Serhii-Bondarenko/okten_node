import Joi from 'joi';

const commentSchema = {
    create: Joi.object().keys({
        text: Joi.string().max(250)
            .trim(true)
            .required(),
        like: Joi.number().max(0),
        dislike: Joi.number().max(0),
        authorId: Joi.number().min(1),
        postId: Joi.number().min(1),
    }),

    action: Joi.object().keys({
        action: Joi.string()
            .trim(true)
            .required(),
        commentId: Joi.number().min(1),
    }),
};

export { commentSchema };
