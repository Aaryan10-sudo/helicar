import Vehicle from "../models/vehicle.model.js";

// Create and Save a new Vehicle
const createVehicle = async(vehicle)=>{
    try{
        return await Vehicle.create(vehicle);
    }catch(err){
        throw err;
    }
}

export { createVehicle}