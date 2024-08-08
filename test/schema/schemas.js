const joi = require("joi");
module.exports.add_product_scheme = joi.object({
    name: joi.string().min(3).max(30).required(),
    description: joi.string().min(3).max(30).required(),
    category_id: joi.number().min(1).max(30).required(),
});
module.exports.add_category_scheme = joi.object({
    name: joi.string().min(3).max(30).required(),
    description: joi.string().min(3).max(30).required(),
});
module.exports.login_scheme = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
    password: joi.string().min(3).max(30).required(),
});
module.exports.signup_scheme = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
    password: joi.string().min(3).max(30).required(),
    userTypeId: joi.number().integer().required(),
});
module.exports.get_product_scheme = joi.object({
    name: joi.string().min(3).max(30),
    id: joi.number().min(3).max(30),
});
module.exports.delete_schema = joi.object({
    id: joi.number().integer().min(1).required(), // Ensuring id is a positive integer and required
});
module.exports.update_scheme_body = joi.object({
    name: joi.string().min(3).max(30),
    descripation: joi.string().min(3).max(255),
    category_id: joi.number().min(1).max(30),
});
module.exports.update_scheme_params = joi.object({
    id: joi.number().integer().min(1).required(),
});
