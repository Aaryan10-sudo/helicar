const { createVehicleService, getAllVehicleService, getAllCarsService, getAllJeepsService, getAllBusService, getAllHiaceService, getSpecificVehicleService } = require("../services/vehicle.service")

exports.createVehicle = async (req,res,next)=>{
    const { 
        vehicleName,
        numberPlate,
        vehicleCategory,
        vehicleType,
        features,
        vehicleImage,
        vehicleBrand,
        vehicleDescription,
        vehiclePrice
    } = req.body
    console.log(req.body)
    try {
        const result = await createVehicleService({
            vehicleName,
            numberPlate,
            vehicleCategory,
            vehicleType,
            features,
            vehicleImage,
            vehicleBrand,
            vehicleDescription,
            vehiclePrice
        })
        res.status(201).json({
            success : true,
            message:"Vehicle created successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.getAllVehicle = async (req,res,next)=>{
    try {
        const result = await getAllVehicleService()
        res.status(200).json({
            success: true,
            message: "Vehicle fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.getAllCars = async (req,res,next)=>{
    try {
        const result = await getAllCarsService()
        res.status(200).json({
            success: true,
            message: "Vehicle fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.getAllJeeps = async (req,res,next)=>{
    try {
        const result = await getAllJeepsService()
        res.status(200).json({
            success: true,
            message: "Vehicle fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.getAllHiace = async (req,res,next)=>{
    try {
        const result = await getAllHiaceService()
        res.status(200).json({
            success: true,
            message: "Vehicle fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.getAllBus = async (req,res,next)=>{
    try {
        const result = await getAllBusService()
        res.status(200).json({
            success: true,
            message: "Vehicle fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.getSpecificVehicle = async (req,res,next)=>{
    try {
        const result = await getSpecificVehicleService(req.params.id);
        res.status(200).json({
            success : true,
            data: result,
            message: "Specific Vehicle Fetched Successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}