import joi from "joi";

const adminRegister = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required().lowercase(),
    password: joi.string().required().min(6),
    role: joi.string().valid("admin").required()
})

const validateAdminRegister = (req, res, next) => {
    const { error } = adminRegister.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
            errors: error.details
        })
    }
    next();
}

export {validateAdminRegister}