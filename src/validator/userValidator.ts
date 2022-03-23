import Joi from 'joi';

const userSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(25)
        .trim(true)
        .required(),
    lastName: Joi.string().alphanum().min(3).max(25)
        .trim(true)
        .required(),
    age: Joi.number().min(1).max(100),
    phone: Joi.string().length(10).pattern(/^[0-9]*$/).required(),
    email: Joi.string().email(
        {
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'ua'] },
        },
    ).required(),
    password: Joi.string().min(8).trim(true).required(),
});

export { userSchema };
