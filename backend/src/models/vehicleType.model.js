import mongoose from "mongoose";

const VehicleTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueIn: true,
    },
    description:{
        type: String,
    }
})

const VehicleType = mongoose.model('VehicleType', VehicleTypeSchema);

export default VehicleType;