import joi from 'joi';

const adminRegister = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required().lowercase(),
  password: joi.string().required().min(6),
  role: joi.string().required(),
});

const adminLogin = joi.object({
  email: joi.string().email().required().lowercase(),
  password: joi.string().required().min(6),
});

const forgotPassword = joi.object({
  email: joi.string().email().required().lowercase(),
});

const validateAdminRegister = (req, res, next) => {
  const { error } = adminRegister.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.details,
    });
  }
  next();
};

const validateAdminLogin = (req, res, next) => {
  const { error } = adminLogin.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.details,
    });
  }
  next();
};

const validateForgotPassword = (req, res, next) => {
  const { error } = forgotPassword.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      errors: error.details,
    });
  }
  next();
};

export { validateAdminRegister, validateAdminLogin, validateForgotPassword };
