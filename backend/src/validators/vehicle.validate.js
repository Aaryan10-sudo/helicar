import joi from 'joi';

const vehicleSchema = joi.object({
    name: joi.string().required(),
    type: joi.string().required(),
    category: joi.string().required(),
    capacity: joi.object({
        passengers: joi.number().required(),
        luggage: joi.number().required()
    }).required(),
    transmission: joi.string().required(),
    doors: joi.number().required(),
    pricing: joi.object({
        perDay: joi.number().required().min(1),
        seasonalDiscounts: joi.array().items(joi.object({
            season: joi.string().valid("Winter", "Summer", "Monsoon", "Spring", "Autumn"),
            discountPercentage: joi.number().min(0).max(100)
        }))
    }).required(),
    locationCovered: joi.array().items(joi.string()),
    features: joi.object({
        audioDevice: joi.boolean().required(),
        blutooth: joi.boolean().required(),
        ac: joi.boolean().required(),
        insurance: joi.boolean().required(),
        selfDrive: joi.boolean().required(),
        smoking: joi.boolean().required()
    }).required()
})

const validateVehicle = (req,res,next) => {
    console.log(req.body)
    const {error} = vehicleSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            success: false,
            message: error.message,
            errors: error.details
        })
    }
    next();
}

export {validateVehicle}
