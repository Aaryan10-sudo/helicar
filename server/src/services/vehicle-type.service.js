const VehicleType = require("../models/vehicle-type.model");

async function createVehicleTypeService (name) {
    try {
        return await VehicleType.create(name);

    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllVehicleTypeService () {
 try {
    return await VehicleType.findAll({})
 } catch (error) {
    throw new Error(error.message)
 }
}

module.exports = {createVehicleTypeService, getAllVehicleTypeService}