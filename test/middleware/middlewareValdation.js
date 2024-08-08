module.exports.add_product_middleware = (add_product_scheme) => {
    return (req, res, next) => {
        const { error } = add_product_scheme.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
/////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////valdation of add category///////////////

module.exports.add_category_middleware = (add_category_scheme) => {
    return (req, res, next) => {
        const { error } = add_category_scheme.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
module.exports.signup_middleware = (signup_scheme) => {
    return (req, res, next) => {
        const { error } = signup_scheme.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
module.exports.login_middleware = (login_scheme) => {
    return (req, res, next) => {
        const { error } = login_scheme.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
/////////////////////////////////////////////////////////////////
/////////////////////////valdation of get product///////////////

module.exports.get_product_middleware = (get_product_scheme) => {
    return (req, res, next) => {
        const { error } = get_product_scheme.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
/////////////////////////////////////////////////////////////////
/////////////////////////valdation of delete ///////////////

module.exports.delete_middleware = (delete_schema) => {
    return (req, res, next) => {
        const { error } = delete_schema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
/////////////////////////////////////////////////////////////////
/////////////////////////valdation of update///////////////

module.exports.update_middleware = (
    update_scheme_params,
    update_scheme_body
) => {
    return (req, res, next) => {
        const { error } = update_scheme_body.validate(req.body);
        const { error1 } = update_scheme_params.validate(req.params);
        if (error || error1) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};
