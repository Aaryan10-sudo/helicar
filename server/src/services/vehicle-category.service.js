const VehicleCategory = require("../models/vehicle-category.model");

async function createVehicleCategoryService (name) {
    try {
        return await VehicleCategory.create(name);

    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllVehicleCategoryService () {
 try {
    return await VehicleCategory.findAll({})
 } catch (error) {
    throw new Error(error.message)
 }
}

module.exports = {createVehicleCategoryService, getAllVehicleCategoryService}